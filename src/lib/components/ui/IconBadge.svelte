<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** An icon, or a short number. */
		children: Snippet;
		class?: string;
	}

	/** The peach circle that holds an icon or a step number. */
	let { children, class: className = '' }: Props = $props();
</script>

<span class={['icon-badge', className]}>{@render children()}</span>

<style>
	.icon-badge {
		display: grid;
		place-items: center;
		flex: none;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: var(--peach);
		color: var(--on-peach);
	}
</style>
