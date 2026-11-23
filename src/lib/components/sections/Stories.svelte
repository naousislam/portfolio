<script lang="ts">
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { fade, fly } from 'svelte/transition';
	import { stories } from '#lib/content/stories.ts';
	import { reveal, slidingPill, swapIn, swapOut } from '#lib/motion.ts';
	import AccentHeadline from '#lib/components/ui/AccentHeadline.svelte';
	import Chip from '#lib/components/ui/Chip.svelte';
	import Modal from '#lib/components/ui/Modal.svelte';
	import RoundButton from '#lib/components/ui/RoundButton.svelte';
	import SectionLabel from '#lib/components/ui/SectionLabel.svelte';
	import StatRow from '#lib/components/ui/StatRow.svelte';

	// Desktop: one story at a time behind a segmented control.
	let active = $state(0);
	const story = $derived(stories[active]);
	// The dark highlight slides from the old tab to the new one.
	const [send, receive] = slidingPill();

	// Phone: a sideways swipe of cards, with the full story in a modal.
	let track: HTMLDivElement;
	let reading = $state(stories[0]);
	let modalOpen = $state(false);

	function swipe(direction: 1 | -1) {
		track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: 'smooth' });
	}

	function readMore(index: number) {
		reading = stories[index];
		modalOpen = true;
	}
</script>

<section id="about" aria-label="Who I am">
	<div class="container section">
		<SectionLabel>Who I am</SectionLabel>

		<div class="desktop only-desktop" {@attach reveal(100)}>
			<div class="tabs" role="tablist" aria-label="My story">
				{#each stories as item, index (item.id)}
					<button
						type="button"
						role="tab"
						id="story-tab-{item.id}"
						aria-selected={index === active}
						aria-controls="story-panel"
						class={{ on: index === active }}
						onclick={() => (active = index)}
					>
						{#if index === active}
							<span class="pill" in:receive={{ key: 'tab' }} out:send={{ key: 'tab' }}></span>
						{/if}
						<span class="tab-label">{item.tab}</span>
					</button>
				{/each}
			</div>

			<div class="panel" role="tabpanel" id="story-panel" aria-labelledby="story-tab-{story.id}">
				{#key story.id}
					<div class="story" in:fly={swapIn} out:fade={swapOut}>
						<p class="headline"><AccentHeadline headline={story.headline} /></p>
						<p class="body">{story.body}</p>
						<StatRow stats={story.stats} />
					</div>
				{/key}
			</div>
		</div>

		<div class="phone only-phone" {@attach reveal(100)}>
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div
				class="track"
				bind:this={track}
				tabindex="0"
				role="group"
				aria-label="My story, swipe sideways"
			>
				{#each stories as item, index (item.id)}
					<article class="card">
						<div class="card-top">
							<Chip>{item.tab}</Chip>
							<span class="count">{index + 1} of {stories.length}</span>
						</div>
						<h3 class="card-headline"><AccentHeadline headline={item.headline} /></h3>
						<p class="card-body">{item.body}</p>
						<button type="button" class="more text-link" onclick={() => readMore(index)}>
							Read more
							<ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
						</button>
						<div class="card-stats"><StatRow stats={item.stats} size="compact" /></div>
					</article>
				{/each}
			</div>

			<div class="controls">
				<span class="hint">{stories.length} stories, swipe to read</span>
				<div class="arrows">
					<RoundButton label="Previous story" onclick={() => swipe(-1)}>
						<ArrowLeft size={18} aria-hidden="true" />
					</RoundButton>
					<RoundButton label="Next story" onclick={() => swipe(1)}>
						<ArrowRight size={18} aria-hidden="true" />
					</RoundButton>
				</div>
			</div>
		</div>
	</div>
</section>

<Modal bind:open={modalOpen} label={reading.tab}>
	<div class="full">
		<Chip tone="peach">{reading.tab}</Chip>
		<h2 class="card-headline"><AccentHeadline headline={reading.headline} /></h2>
		<p class="full-body">{reading.body}</p>
		<div class="full-stats"><StatRow stats={reading.stats} size="compact" /></div>
	</div>
</Modal>

<style>
	.desktop {
		text-align: center;
	}

	.tabs {
		display: inline-flex;
		gap: 4px;
		margin-bottom: 56px;
		padding: 5px;
		border-radius: 999px;
		background: var(--surface);
	}

	.tabs button {
		position: relative;
		height: 44px;
		padding: 0 22px;
		border: 0;
		border-radius: 999px;
		background: transparent;
		font-size: 16px;
		font-weight: 500;
		color: var(--muted);
		cursor: pointer;
		transition: color 0.4s var(--ease);
	}

	/* The highlight is its own element so it can travel between tabs. */
	.pill {
		position: absolute;
		inset: 0;
		border-radius: 999px;
		background: var(--ink-fill);
	}

	.tab-label {
		position: relative;
	}

	.tabs button:hover {
		color: var(--ink);
	}

	.tabs button.on {
		color: var(--on-fill);
	}

	.tabs button:focus-visible {
		border-radius: 999px;
	}

	/* Tall enough for the longest story, so the page below does not jump between tabs. */
	.panel {
		display: grid;
		align-items: start;
		min-height: 520px;
	}

	/* Old and new story share one grid cell, so they cross over without a jump. */
	.story {
		grid-area: 1 / 1;
	}

	.headline {
		max-width: 760px;
		margin: 0 auto;
		font-size: clamp(26px, 3.1vw, 44px);
		line-height: 1.14;
		letter-spacing: -0.035em;
		text-wrap: balance;
	}

	.body {
		max-width: 680px;
		margin: 20px auto 0;
		color: var(--ink-soft);
		text-wrap: pretty;
	}

	/* Phone */
	.track {
		display: flex;
		align-items: stretch;
		gap: 14px;
		margin: 0 -20px;
		padding: 4px 20px;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		scrollbar-width: none;
	}

	.track::-webkit-scrollbar {
		display: none;
	}

	.card {
		display: flex;
		flex: 0 0 88%;
		flex-direction: column;
		height: 436px;
		padding: 24px 22px 26px;
		border-radius: 28px;
		background: var(--surface);
		scroll-snap-align: center;
	}

	.card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 22px;
	}

	.count {
		font-size: 15px;
		color: var(--muted);
		font-variant-numeric: tabular-nums;
	}

	.card-headline {
		font-size: 27px;
		line-height: 1.14;
		font-weight: 500;
		letter-spacing: -0.035em;
		text-wrap: balance;
	}

	.card-body {
		display: -webkit-box;
		margin-top: 20px;
		overflow: hidden;
		color: var(--ink-soft);
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		line-clamp: 3;
	}

	.more {
		align-self: flex-start;
		margin-top: 14px;
	}

	.card-stats {
		margin-top: auto;
	}

	.controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 18px;
	}

	.hint {
		font-size: 15.5px;
		color: var(--muted);
	}

	.arrows {
		display: flex;
		gap: 10px;
	}

	/* Full story, in the modal */
	.full .card-headline {
		margin-top: 18px;
		padding-right: 48px;
	}

	.full-body {
		margin-top: 20px;
		color: var(--ink-soft);
		text-wrap: pretty;
	}

	.full-stats {
		margin-top: 28px;
	}
</style>
