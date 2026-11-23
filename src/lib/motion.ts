/**
 * Shared motion for the site: one easing, a scroll reveal, and the transition settings the
 * tabs, stepper and nav reuse. The CSS side of the reveal lives in app.css.
 */
import type { Attachment } from 'svelte/attachments';
import { cubicOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';

/**
 * Fades and lifts an element into place the first time it scrolls into view.
 * Use as `{@attach reveal()}`; pass a delay in milliseconds to stagger neighbours.
 *
 * The hidden starting state is only applied here, in the browser, so the content is still
 * there for search engines and for anyone without JavaScript.
 */
export function reveal(delay = 0): Attachment<HTMLElement> {
	return (node) => {
		node.classList.add('reveal');
		node.style.setProperty('--reveal-delay', `${delay}ms`);

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				node.classList.add('revealed');
				observer.disconnect();
			},
			// Wait until the element has cleared the floating bar at the bottom of the screen.
			{ rootMargin: '0px 0px -110px 0px' }
		);
		observer.observe(node);

		return () => observer.disconnect();
	};
}

/**
 * A pair for a highlight that slides between items (the story tabs, the section nav):
 * the pill leaving one item and the pill arriving in the next are animated as one.
 */
export const slidingPill = () => crossfade({ duration: 450, easing: cubicOut });

/** Content arriving after a swap: it lifts in once the old content has faded. */
export const swapIn = { y: 18, duration: 520, delay: 140, easing: cubicOut };

/** Content leaving in a swap: a quick fade, so it never lingers under the new content. */
export const swapOut = { duration: 160 };
