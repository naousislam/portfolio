/**
 * The server half of the bot check: asks Cloudflare whether a Turnstile token is good.
 * The pattern follows the one in Monody (packages/core/src/leads/turnstile.ts).
 */
import { dev } from '$app/env';
import { TURNSTILE_SECRET_KEY } from '$app/env/private';
import { TURNSTILE_SITE_KEY } from '$app/env/public';

/** Whether the bot check is switched on for this deployment. */
export const turnstileEnabled = Boolean(TURNSTILE_SITE_KEY);

/**
 * True when the visitor passed the check.
 *
 * - Not configured: passes, the check is simply off.
 * - Dev server: passes. The page draws Cloudflare's always-pass test key there, and that
 *   token must never be checked against the real secret.
 * - Configured but the secret is missing in production: refuses, so a deploy that lost its
 *   secret does not quietly let every script through.
 */
export async function verifyTurnstile(token: string | null, ip?: string): Promise<boolean> {
	if (!turnstileEnabled || dev) return true;
	if (!TURNSTILE_SECRET_KEY) {
		console.error('[turnstile] TURNSTILE_SECRET_KEY is not set.');
		return false;
	}
	if (!token) return false;

	try {
		const body = new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: token });
		if (ip) body.set('remoteip', ip);

		const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			body,
			signal: AbortSignal.timeout(5_000)
		});
		if (!response.ok) return false;

		const result = (await response.json()) as { success?: boolean };
		return result.success === true;
	} catch {
		return false;
	}
}
