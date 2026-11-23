/**
 * The browser half of the bot check: loads Cloudflare Turnstile once and draws one widget.
 * The pattern follows the one in Monody (apps/tenant-app/src/lib/turnstile.ts).
 *
 * The widget is drawn inside the form, so Turnstile adds its own hidden field
 * (`cf-turnstile-response`) and the token is posted with everything else. Cloudflare only
 * shows something when it needs the person to act; most visitors never see it.
 */

/** Cloudflare's documented always-pass site key, for local development. */
const TEST_SITE_KEY = '1x00000000000000000000AA';
const SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

interface TurnstileApi {
	render(element: HTMLElement, options: Record<string, unknown>): string;
	reset(id: string): void;
	remove(id: string): void;
}

declare global {
	interface Window {
		turnstile?: TurnstileApi;
	}
}

let loading: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
	if (window.turnstile) return Promise.resolve(window.turnstile);
	loading ??= new Promise<TurnstileApi>((resolve, reject) => {
		const script = document.createElement('script');
		script.src = SCRIPT;
		script.async = true;
		script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error()));
		script.onerror = () => {
			loading = null;
			reject(new Error('Turnstile script failed to load'));
		};
		document.head.appendChild(script);
	});
	return loading;
}

export interface TurnstileWidget {
	/** A token is good once, so ask for a fresh one after a failed send. */
	reset(): void;
	remove(): void;
}

/** Draws the widget in `box`. On a local dev host it uses the always-pass test key. */
export function mountTurnstile(box: HTMLElement, siteKey: string): TurnstileWidget {
	const isLocal = /(^|\.)localhost$|^127\.0\.0\.1$/.test(location.hostname);
	let api: TurnstileApi | null = null;
	let id: string | null = null;
	let removed = false;

	loadTurnstile()
		.then((turnstile) => {
			if (removed) return;
			api = turnstile;
			id = turnstile.render(box, {
				sitekey: isLocal ? TEST_SITE_KEY : siteKey,
				appearance: 'interaction-only',
				theme: 'light'
			});
		})
		.catch(() => {
			// Without the script there is no token, and the server will say the check failed.
		});

	return {
		reset: () => {
			if (api && id) api.reset(id);
		},
		remove: () => {
			removed = true;
			if (api && id) api.remove(id);
		}
	};
}
