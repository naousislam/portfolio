<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		label: string;
		children: Snippet;
	}

	let { label, children, class: className, ...rest }: Props = $props();
</script>

<button type="button" class={['round', className]} aria-label={label} {...rest}>
	{@render children()}
</button>

<style>
	.round {
		display: grid;
		place-items: center;
		flex: none;
		width: 48px;
		height: 48px;
		border: 1px solid var(--line);
		border-radius: 50%;
		background: var(--card);
		color: var(--ink);
		cursor: pointer;
		transition:
			border-color 0.2s ease,
			transform 0.2s ease;
	}

	.round:hover {
		border-color: var(--ink-fill);
		transform: scale(1.06);
	}

	.round:focus-visible {
		border-radius: 50%;
	}
</style>
