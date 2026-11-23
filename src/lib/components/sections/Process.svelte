<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { steps, STEP_INTERVAL_MS } from '#lib/content/steps.ts';
	import { pauseOffscreen, reveal, swapIn, swapOut } from '#lib/motion.ts';
	import IconBadge from '#lib/components/ui/IconBadge.svelte';
	import SectionLabel from '#lib/components/ui/SectionLabel.svelte';
	import StepAnimation from './StepAnimation.svelte';

	let active = $state(0);
	// The stepper advances on its own until the visitor picks a step.
	let auto = $state(true);
	const step = $derived(steps[active]);

	$effect(() => {
		if (!auto) return;
		const timer = setInterval(() => {
			active = (active + 1) % steps.length;
		}, STEP_INTERVAL_MS);
		return () => clearInterval(timer);
	});

	function pick(index: number) {
		active = index;
		auto = false;
	}

	const number = (index: number) => String(index + 1).padStart(2, '0');
</script>

<section id="how" aria-label="How I Work">
	<div class="container section">
		<SectionLabel>How I Work</SectionLabel>

		<div class="only-desktop">
			<div class="steps" style:--interval="{STEP_INTERVAL_MS}ms" {@attach reveal(100)}>
				{#each steps as item, index (item.id)}
					<button
						type="button"
						class={['step', { on: index === active }]}
						aria-pressed={index === active}
						onclick={() => pick(index)}
					>
						<span class="bar"><span></span></span>
						<span class="number">{number(index)}</span>
						<span class="title">{item.title}</span>
					</button>
				{/each}
			</div>

			<div class="stage" {@attach reveal(200)} {@attach pauseOffscreen()}>
				<div class="text">
					{#key step.id}
						<div class="swap" in:fly={swapIn} out:fade={swapOut}>
							<h3>{step.title}.</h3>
							<p>{step.sentence}</p>
						</div>
					{/key}
				</div>
				<div class="animation">
					{#key step.id}
						<div class="scene" in:fade={{ duration: 300, delay: 140 }} out:fade={swapOut}>
							<StepAnimation step={step.id} />
						</div>
					{/key}
				</div>
			</div>
		</div>

		<ol class="timeline only-phone">
			{#each steps as item, index (item.id)}
				<li {@attach reveal(index * 90)}>
					<IconBadge class="step-marker">{index + 1}</IconBadge>
					<div>
						<h3>{item.title}</h3>
						<p>{item.sentence}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.steps {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 12px;
	}

	.step {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 6px;
		padding: 0 4px;
		border: 0;
		background: none;
		color: var(--faint);
		text-align: left;
		cursor: pointer;
		transition: color 0.5s var(--ease);
	}

	.step:hover {
		color: var(--muted);
	}

	.step.on {
		color: var(--ink);
	}

	.bar {
		align-self: stretch;
		height: 3px;
		margin-bottom: 14px;
		overflow: hidden;
		border-radius: 2px;
		background: var(--line);
	}

	.bar span {
		display: block;
		width: 0;
		height: 100%;
		border-radius: 2px;
		background: var(--ink-fill);
	}

	.step.on .bar span {
		animation: fill var(--interval) linear forwards;
	}

	@keyframes fill {
		to {
			width: 100%;
		}
	}

	.number {
		font-size: 15px;
		font-variant-numeric: tabular-nums;
	}

	.title {
		font-size: clamp(19px, 2vw, 26px);
		letter-spacing: -0.03em;
	}

	.stage {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 40px 56px;
		margin-top: 40px;
		padding: clamp(24px, 4vw, 56px);
		border-radius: 36px;
		background: var(--surface);
	}

	/* Old and new step share one grid cell, so they cross over without a jump. */
	.text,
	.animation {
		display: grid;
	}

	.swap,
	.scene {
		grid-area: 1 / 1;
		min-width: 0;
	}

	.text {
		flex: 1 1 300px;
		min-width: 0;
		min-height: 200px;
	}

	.text h3 {
		font-size: clamp(34px, 4vw, 56px);
		line-height: 1.02;
		font-weight: 500;
		letter-spacing: -0.045em;
	}

	.text p {
		max-width: 380px;
		margin-top: 20px;
		color: var(--ink-soft);
	}

	.animation {
		flex: 1.4 1 420px;
		min-width: 0;
		height: 420px;
		overflow: hidden;
		border-radius: 32px;
		background: var(--card);
	}

	/* Phone: a vertical timeline, no animation panel. */
	.timeline {
		position: relative;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.timeline::before {
		content: '';
		position: absolute;
		top: 22px;
		bottom: 60px;
		left: 21px;
		width: 2px;
		background: var(--line);
	}

	.timeline li {
		position: relative;
		display: flex;
		gap: 18px;
		padding-bottom: 36px;
	}

	.timeline li:last-child {
		padding-bottom: 0;
	}

	/* The ring of page colour stops the timeline's line running into the number. */
	.timeline :global(.step-marker) {
		position: relative;
		box-shadow: 0 0 0 6px var(--bg);
		font-size: 16px;
	}

	.timeline h3 {
		font-size: 24px;
		line-height: 1.15;
		font-weight: 500;
		letter-spacing: -0.03em;
	}

	.timeline p {
		margin-top: 8px;
		color: var(--ink-soft);
	}
</style>
