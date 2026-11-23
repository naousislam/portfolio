<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		/** What the chip sits on decides its fill: `card` on a surface, `raised` on a card, `peach` as an accent. */
		tone?: 'card' | 'raised' | 'peach';
		class?: string;
	}

	/** A small pill label: a story's name, a project's badge or category. */
	let { children, tone = 'card', class: className = '' }: Props = $props();
</script>

<span class={['chip', tone, className]}>{@render children()}</span>

<style>
	.chip {
		display: inline-flex;
		align-items: center;
		min-height: 34px;
		padding: 4px 14px;
		border-radius: 999px;
		font-size: 15px;
	}

	.card {
		background: var(--card);
	}

	.raised {
		background: var(--raised);
	}

	.peach {
		background: var(--peach);
		color: var(--on-peach);
	}
</style>
