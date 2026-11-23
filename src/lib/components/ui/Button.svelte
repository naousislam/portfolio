<script lang="ts">
	import type { Snippet } from 'svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import type { Icon } from '#lib/content/types.ts';

	interface Props {
		children: Snippet;
		variant?: 'primary' | 'outline';
		/** Renders a link when set, a button otherwise. */
		href?: string;
		external?: boolean;
		type?: 'button' | 'submit';
		disabled?: boolean;
		icon?: Icon;
		class?: string;
	}

	let {
		children,
		variant = 'primary',
		href,
		external = false,
		type = 'button',
		disabled = false,
		icon: IconComponent = ArrowRight,
		class: className = ''
	}: Props = $props();
</script>

{#snippet content()}
	{@render children()}
	<span class="icon"><IconComponent size={16} strokeWidth={2.2} aria-hidden="true" /></span>
{/snippet}

{#if href}
	<!-- Hash links and external links, not app routes. -->
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<a
		class={['button', variant, className]}
		{href}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener' : undefined}
	>
		{@render content()}
	</a>
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
{:else}
	<button class={['button', variant, className]} {type} {disabled}>
		{@render content()}
	</button>
{/if}

<style>
	.button {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		height: 56px;
		padding: 0 30px;
		border: 1px solid var(--ink-fill);
		border-radius: 999px;
		background: var(--ink-fill);
		color: var(--on-fill);
		font-size: 17px;
		font-weight: 500;
		text-decoration: none;
		white-space: nowrap;
		cursor: pointer;
		transition:
			background 0.4s var(--ease),
			border-color 0.4s var(--ease),
			color 0.4s var(--ease),
			transform 0.4s var(--ease);
	}

	.button:hover:not(:disabled) {
		background: var(--peach);
		color: var(--on-peach);
		border-color: var(--peach);
		transform: translateY(-2px);
	}

	.button:disabled {
		opacity: 0.6;
		cursor: progress;
	}

	.outline {
		background: transparent;
		border-color: var(--line-strong);
		color: var(--ink);
	}

	.icon {
		display: inline-grid;
		place-items: center;
		transition: transform 0.4s var(--ease);
	}

	.button:hover:not(:disabled) .icon {
		transform: translateX(4px);
	}
</style>
