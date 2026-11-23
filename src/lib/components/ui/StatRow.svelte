<script lang="ts">
	import type { Stat } from '#lib/content/types.ts';

	interface Props {
		stats: Stat[];
		/** `large` is the centred desktop row; `compact` sits along the bottom of a phone card. */
		size?: 'large' | 'compact';
	}

	let { stats, size = 'large' }: Props = $props();
</script>

<dl class={['stats', size]}>
	{#each stats as stat (stat.label)}
		<div class="stat">
			<dt class="label">{stat.label}</dt>
			<dd class="value">{stat.value}</dd>
		</div>
	{/each}
</dl>

<style>
	.stats {
		display: flex;
		margin: 0;
	}

	.stat {
		display: flex;
		/* The label is the term, so it comes first in the markup and is flipped below the value. */
		flex-direction: column-reverse;
		justify-content: flex-end;
		min-width: 0;
	}

	.value {
		margin: 0;
		line-height: 1;
		font-weight: 500;
	}

	.label {
		color: var(--muted);
	}

	.large {
		flex-wrap: wrap;
		justify-content: center;
		gap: 40px 0;
		max-width: 900px;
		margin: 64px auto 0;
	}

	.large .stat {
		flex: 1 1 200px;
		padding: 0 24px;
		text-align: center;
	}

	.large .stat + .stat {
		border-left: 1px solid var(--line);
	}

	.large .value {
		font-size: clamp(38px, 4.6vw, 64px);
		letter-spacing: -0.05em;
	}

	.large .label {
		margin-top: 10px;
		font-size: 16.5px;
	}

	.compact {
		gap: 12px;
		padding-top: 22px;
		border-top: 1px solid var(--line);
	}

	.compact .stat {
		flex: 1 1 0;
	}

	.compact .value {
		font-size: 24px;
		letter-spacing: -0.04em;
		white-space: nowrap;
	}

	.compact .label {
		margin-top: 6px;
		font-size: 13.5px;
		line-height: 1.3;
	}
</style>
