<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from '#lib/motion.ts';

	let { children }: { children: Snippet } = $props();
</script>

<h2 class="label" {@attach reveal()}>{@render children()}</h2>

<style>
	.label {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		margin: 0 0 48px;
		font-size: 17px;
		font-weight: 500;
		color: var(--muted);
	}

	.label::before,
	.label::after {
		content: '';
		width: 28px;
		height: 1px;
		background: var(--faint);
	}
</style>
