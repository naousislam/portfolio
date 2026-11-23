<script lang="ts">
	import { onMount } from 'svelte';
	import House from '@lucide/svelte/icons/house';
	import Layers from '@lucide/svelte/icons/layers';
	import LayoutGrid from '@lucide/svelte/icons/layout-grid';
	import Mail from '@lucide/svelte/icons/mail';
	import Moon from '@lucide/svelte/icons/moon';
	import Sun from '@lucide/svelte/icons/sun';
	import User from '@lucide/svelte/icons/user';
	import type { Icon } from '#lib/content/types.ts';
	import { slidingPill } from '#lib/motion.ts';
	import { applyTheme, currentTheme, type Theme } from '#lib/theme.ts';

	interface NavItem {
		href: string;
		label: string;
		icon: Icon;
		/** Section ids that light this item up while they are in view. */
		sections: string[];
	}

	const items: NavItem[] = [
		{ href: '#intro', label: 'Top', icon: House, sections: ['intro'] },
		{ href: '#about', label: 'Who I Am', icon: User, sections: ['about'] },
		{ href: '#how', label: 'How I Work', icon: Layers, sections: ['how', 'skills'] },
		{ href: '#work', label: "What I've Built", icon: LayoutGrid, sections: ['work'] },
		{ href: '#contact', label: 'Contact', icon: Mail, sections: ['contact'] }
	];

	let active = $state('intro');
	// The dark highlight slides from the old section's button to the new one.
	const [send, receive] = slidingPill();

	$effect(() => {
		// A section is "current" while it crosses the middle band of the viewport.
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) active = entry.target.id;
				}
			},
			{ rootMargin: '-45% 0px -45% 0px' }
		);

		for (const id of items.flatMap((item) => item.sections)) {
			const section = document.getElementById(id);
			if (section) observer.observe(section);
		}

		return () => observer.disconnect();
	});

	/** Space kept clear at the bottom of the screen for this bar. */
	const BAR_ROOM = 96;

	/**
	 * Scrolls to a section so it sits in the middle of the screen, between the top edge and
	 * this bar. A section too tall to fit starts just below the top instead.
	 */
	function jumpTo(id: string) {
		const section = document.getElementById(id);
		if (!section) return false;

		let top = 0;
		if (id !== 'intro') {
			// Measure the section's content, without the padding that separates it from its neighbours.
			const body = section.querySelector<HTMLElement>('.section') ?? section;
			const box = body.getBoundingClientRect();
			const style = getComputedStyle(body);
			const paddingTop = parseFloat(style.paddingTop);
			const contentTop = box.top + window.scrollY + paddingTop;
			const contentHeight = box.height - paddingTop - parseFloat(style.paddingBottom);
			const room = window.innerHeight - BAR_ROOM;
			top = contentHeight <= room ? contentTop - (room - contentHeight) / 2 : contentTop - 40;
		}

		const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.scrollTo({ top, behavior: calm ? 'auto' : 'smooth' });
		return true;
	}

	// Every same-page link (this bar, the hero buttons, the name in the top bar) lands the same way.
	function onDocumentClick(event: MouseEvent) {
		if (event.defaultPrevented || event.button !== 0) return;
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		if (!(event.target instanceof Element)) return;

		const hash = event.target.closest('a[href^="#"]')?.getAttribute('href');
		if (!hash || !jumpTo(hash.slice(1))) return;

		// The address bar is left alone: this is one page, and the bar shows where you are.
		event.preventDefault();
	}

	// Theme toggle. The real value is on <html>; this mirrors it for the button's icon.
	let theme = $state<Theme>('light');
	onMount(() => {
		theme = currentTheme();
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		applyTheme(theme);
	}
	const themeLabel = $derived(theme === 'dark' ? 'Light Theme' : 'Dark Theme');
</script>

<svelte:document onclick={onDocumentClick} />

<div class="nav">
	<nav class="links" aria-label="Sections">
		{#each items as item (item.href)}
			{@const current = item.sections.includes(active)}
			<a class={['item', { current }]} href={item.href} aria-current={current ? 'true' : undefined}>
				{#if current}
					<span class="pill" in:receive={{ key: 'nav' }} out:send={{ key: 'nav' }}></span>
				{/if}
				<span class="glyph"><item.icon size={20} strokeWidth={1.9} aria-hidden="true" /></span>
				<span class="label">{item.label}</span>
			</a>
		{/each}
	</nav>

	<span class="divider" aria-hidden="true"></span>

	<button type="button" class="item" onclick={toggleTheme} aria-label={themeLabel}>
		<span class="glyph">
			{#if theme === 'dark'}
				<Sun size={20} strokeWidth={1.9} aria-hidden="true" />
			{:else}
				<Moon size={20} strokeWidth={1.9} aria-hidden="true" />
			{/if}
		</span>
		<span class="label">{themeLabel}</span>
	</button>
</div>

<style>
	/* A floating bar, centred along the bottom of the screen at every size. */
	.nav {
		position: fixed;
		z-index: 30;
		bottom: 18px;
		left: 50%;
		display: flex;
		gap: 2px;
		transform: translateX(-50%);
		padding: 5px;
		border: 1px solid var(--line);
		border-radius: 24px;
		background: color-mix(in srgb, var(--bg) 82%, transparent);
		backdrop-filter: blur(10px);
	}

	/* The section links lay out as if they were direct children of the pill. */
	.links {
		display: contents;
	}

	.divider {
		align-self: center;
		width: 1px;
		height: 20px;
		margin: 0 3px;
		background: var(--line);
	}

	.item {
		position: relative;
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		padding: 0;
		border: 0;
		background: none;
		color: var(--muted-soft);
		text-decoration: none;
		cursor: pointer;
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}

	.item:hover {
		background: var(--surface-hover);
		color: var(--ink);
	}

	.item.current,
	.item.current:hover {
		background: transparent;
		color: var(--on-fill);
	}

	/* The highlight is its own element so it can travel between buttons. */
	.pill {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: var(--ink-fill);
	}

	.glyph {
		position: relative;
		display: grid;
	}

	.item:focus-visible {
		border-radius: 50%;
	}

	/* The name of each button, shown above it on hover. */
	.label {
		position: absolute;
		bottom: 56px;
		left: 50%;
		padding: 5px 10px;
		border-radius: 8px;
		background: var(--ink-fill);
		color: var(--on-fill);
		font-size: 13px;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transform: translate(-50%, 6px);
		transition:
			opacity 0.18s ease,
			transform 0.18s ease;
	}

	.item:hover .label,
	.item:focus-visible .label {
		opacity: 1;
		transform: translate(-50%, 0);
	}

	@media (max-width: 860px) {
		/* A solid bar on phones: a see-through, blurred one is redrawn on every scroll frame. */
		.nav {
			bottom: 14px;
			background: var(--bg);
			backdrop-filter: none;
		}

		/* On a phone the label is for screen readers only. */
		.label {
			width: 1px;
			height: 1px;
			padding: 0;
			overflow: hidden;
			clip-path: inset(50%);
		}
	}
</style>
