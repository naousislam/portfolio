import { defineEnvVars } from '@sveltejs/kit/env';

const optional = (value: string | undefined) => value || undefined;

export const variables = defineEnvVars({
	RESEND_API_KEY: {
		schema: optional,
		description:
			'Resend API key for the contact form. When unset, the dev server logs messages instead of sending them.'
	},
	CONTACT_TO: {
		schema: (value) => value || 'nao@naous.dev',
		description: 'Where contact form messages are delivered.'
	},
	CONTACT_FROM: {
		schema: (value) => value || 'New Portfolio Connection <portfolio@naous.dev>',
		description: 'Sender for contact form messages. The domain must be verified in Resend.'
	},
	TURNSTILE_SITE_KEY: {
		public: true,
		schema: optional,
		description:
			'Cloudflare Turnstile site key. Public: the browser needs it to draw the bot check. When unset, the check is off.'
	},
	TURNSTILE_SECRET_KEY: {
		schema: optional,
		description: 'Cloudflare Turnstile secret key, used on the server to verify the bot check.'
	},
	UPSTASH_REDIS_REST_URL: {
		schema: optional,
		description:
			'Upstash Redis URL for the shared rate limit. When unset, limits are counted in memory per server instance.'
	},
	UPSTASH_REDIS_REST_TOKEN: {
		schema: optional,
		description: 'Upstash Redis token for the shared rate limit.'
	}
});
