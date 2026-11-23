<script lang="ts">
	import { steps } from '#lib/content/steps.ts';

	/** The five "How I work" steps placed around a circle, with a dot travelling around it. */
	const centre = { x: 260, y: 165 };
	const radius = 100;

	// Where each label sits relative to its numbered node, going clockwise from the top.
	const labelOffsets = [
		{ dx: 0, dy: -27, anchor: 'middle' },
		{ dx: 32.3, dy: -5.5, anchor: 'start' },
		{ dx: 20, dy: 32.5, anchor: 'start' },
		{ dx: -20, dy: 32.5, anchor: 'end' },
		{ dx: -32.3, dy: -5.5, anchor: 'end' }
	] as const;

	const nodes = steps.map((step, index) => {
		const angle = ((-90 + (360 / steps.length) * index) * Math.PI) / 180;
		const x = centre.x + radius * Math.cos(angle);
		const y = centre.y + radius * Math.sin(angle);
		const label = labelOffsets[index];
		return { step, x, y, labelX: x + label.dx, labelY: y + label.dy, anchor: label.anchor };
	});

	const description = `${steps.map((step) => step.title).join(', ')}, Then Around Again`;
</script>

<svg viewBox="0 0 520 330" role="img" aria-label={description}>
	<circle
		cx={centre.x}
		cy={centre.y}
		r={radius}
		fill="none"
		style="stroke: var(--ring)"
		stroke-width="2"
	/>
	<g class="runner continuous">
		<circle cx={centre.x} cy={centre.y - radius} r="7" style="fill: var(--ink-fill)" />
	</g>
	{#each nodes as node, index (node.step.id)}
		<circle cx={node.x} cy={node.y} r="19" style="fill: var(--peach)" />
		<text x={node.x} y={node.y + 5} text-anchor="middle" class="number">{index + 1}</text>
		<text x={node.labelX} y={node.labelY} text-anchor={node.anchor} class="name">
			{node.step.title}
		</text>
	{/each}
	<text x={centre.x} y={centre.y + 5} text-anchor="middle" class="centre">And Around Again</text>
</svg>

<style>
	svg {
		display: block;
		width: min(520px, 100%);
		margin: 28px auto 0;
		font-family: inherit;
	}

	.runner {
		transform-origin: 260px 165px;
		animation: spin 9s linear infinite;
	}

	.number {
		font-size: 14px;
		font-weight: 500;
		fill: var(--on-peach);
	}

	.name {
		font-size: 16px;
		fill: var(--ink);
	}

	.centre {
		font-size: 15px;
		fill: var(--muted);
	}
</style>
