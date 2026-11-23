/**
 * Light and dark theme. The choice lives in `data-theme` on <html>, which the colour tokens in
 * app.css read, and is remembered in localStorage. A small inline script in app.html applies
 * the remembered choice before the first paint, so a returning visitor never sees a flash.
 *
 * Light is the default. The site does not follow the device's setting on its own.
 */
export type Theme = 'light' | 'dark';

/** Keep in step with the inline script in src/app.html. */
const STORAGE_KEY = 'theme';
const PAGE_COLOUR: Record<Theme, string> = { light: '#ffffff', dark: '#1b1c1f' };

export function currentTheme(): Theme {
	return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function applyTheme(theme: Theme) {
	const update = () => {
		document.documentElement.dataset.theme = theme;
		// The browser's own toolbar colour on phones.
		document.querySelector('meta[name="theme-color"]')?.setAttribute('content', PAGE_COLOUR[theme]);
	};

	// Where the browser supports it, the whole page cross-fades between the two themes.
	if ('startViewTransition' in document) {
		// The fade is skipped if the tab is in the background. The theme still changes.
		const transition = document.startViewTransition(update);
		transition.ready.catch(() => {});
		transition.finished.catch(() => {});
	} else {
		update();
	}

	try {
		localStorage.setItem(STORAGE_KEY, theme);
	} catch {
		// Private browsing can refuse storage. The theme still applies for this visit.
	}
}
