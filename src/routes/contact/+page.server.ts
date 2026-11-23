import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { dev } from '$app/env';
import { CONTACT_FROM, CONTACT_TO, RESEND_API_KEY } from '$app/env/private';
import { contact } from '#lib/content/site.ts';
import type { ContactResult } from '#lib/content/types.ts';
import { contactEmail } from '#lib/server/contact-email.ts';
import { checkRateLimit, RATE_LIMITS } from '#lib/server/rate-limit.ts';
import { verifyTurnstile } from '#lib/server/turnstile.ts';
import type { Actions } from './$types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 120, email: 254, message: 5000 };

function field(data: FormData, name: string) {
	const value = data.get(name);
	return typeof value === 'string' ? value.trim() : '';
}

export const actions: Actions = {
	default: async ({ request, getClientAddress }) => {
		const data = await request.formData();

		// Spam trap: the "company" field is hidden from people, so only bots fill it in.
		// Answer as if it worked, and send nothing.
		if (field(data, 'company')) return { success: true } satisfies ContactResult;

		const values = {
			name: field(data, 'name'),
			email: field(data, 'email'),
			message: field(data, 'message')
		};

		const refused = (status: number, message: string) =>
			fail(status, { success: false, message, values } satisfies ContactResult);

		// Rate limit: each visitor gets a few sends an hour, and the form as a whole has a daily cap.
		const ip = getClientAddress();
		const allowed =
			(await checkRateLimit(`contact:ip:${ip}`, RATE_LIMITS.contactPerIp)) &&
			(await checkRateLimit('contact:all', RATE_LIMITS.contactOverall));
		if (!allowed) return refused(429, contact.tooMany);

		const errors: ContactResult['errors'] = {};
		if (!values.name || values.name.length > LIMITS.name) errors.name = 'Please add your name.';
		if (!EMAIL_PATTERN.test(values.email) || values.email.length > LIMITS.email)
			errors.email = 'Please add an email address I can reply to.';
		if (!values.message) errors.message = 'Please tell me a little about what you need.';
		else if (values.message.length > LIMITS.message)
			errors.message = `Please keep this under ${LIMITS.message.toLocaleString('en-CA')} characters.`;

		if (Object.keys(errors).length) {
			return fail(400, { success: false, errors, values } satisfies ContactResult);
		}

		// Bot check, last before sending: a Turnstile token can only be used once.
		if (!(await verifyTurnstile(field(data, 'cf-turnstile-response') || null, ip))) {
			return refused(403, contact.botCheckFailed);
		}

		const sendFailed = () => refused(502, contact.failure);

		if (!RESEND_API_KEY) {
			if (dev) {
				console.info('[contact] RESEND_API_KEY is not set. Message not sent:', values);
				return { success: true } satisfies ContactResult;
			}
			console.error('[contact] RESEND_API_KEY is not set.');
			return sendFailed();
		}

		const { error } = await new Resend(RESEND_API_KEY).emails.send({
			from: CONTACT_FROM,
			to: CONTACT_TO,
			replyTo: values.email,
			...contactEmail(values)
		});

		if (error) {
			console.error('[contact] Resend rejected the message:', error.name);
			return sendFailed();
		}

		return { success: true } satisfies ContactResult;
	}
};
