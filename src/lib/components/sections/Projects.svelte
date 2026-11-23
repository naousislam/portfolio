<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import type { EmblaCarouselType } from 'embla-carousel';
	import emblaCarousel from 'embla-carousel-svelte';
	import { projects } from '#lib/content/projects.ts';
	import { pauseOffscreen, reveal } from '#lib/motion.ts';
	import Chip from '#lib/components/ui/Chip.svelte';
	import Modal from '#lib/components/ui/Modal.svelte';
	import SectionLabel from '#lib/components/ui/SectionLabel.svelte';
	import ProjectDetail from './ProjectDetail.svelte';
	import ProjectVisual from './ProjectVisual.svelte';

	/*
	 * A looping carousel (Embla): the project in focus sits in the middle at full size, its
	 * neighbours are smaller and dimmed, and the row runs off both edges of the screen.
	 * Dragging, swiping, or pressing a neighbour moves it, and it wraps around. There are no
	 * arrow buttons: the neighbouring projects are the buttons.
	 */
	let carousel = $state<EmblaCarouselType>();
	let focused = $state(0);
	// True while the carousel is moving. Loops pause for that time so the swipe stays smooth.
	let moving = $state(false);
	let restTimer: ReturnType<typeof setTimeout> | undefined;

	// Movement reports itself many times a second; a short quiet spell means it has stopped.
	function onMove() {
		moving = true;
		clearTimeout(restTimer);
		restTimer = setTimeout(() => (moving = false), 180);
	}

	function onCarouselReady(event: CustomEvent<EmblaCarouselType>) {
		const api = event.detail;
		carousel = api;
		focused = api.selectedScrollSnap();
		api.on('select', () => (focused = api.selectedScrollSnap()));
		api.on('scroll', onMove);
	}

	let detail = $state(projects[0]);
	let open = $state(false);

	function press(index: number) {
		// Embla swallows the click that ends a drag, so a press here is always deliberate.
		// A neighbour comes into focus first. The focused project opens its detail.
		if (carousel && index !== focused) {
			carousel.scrollTo(index);
			return;
		}
		detail = projects[index];
		open = true;
	}
</script>

<section id="work" aria-label="What I've Built">
	<div class="section">
		<div class="container">
			<SectionLabel>What I've Built</SectionLabel>
		</div>

		<div class={['carousel', { moving }]} {@attach reveal(100)} {@attach pauseOffscreen()}>
			<div
				class={['viewport', { ready: carousel }]}
				use:emblaCarousel={{ options: { loop: true, align: 'center' }, plugins: [] }}
				onemblaInit={onCarouselReady}
			>
				<div class="track">
					{#each projects as project, index (project.id)}
						<div class={['slide', { focused: index === focused }]}>
							<button
								type="button"
								class="card"
								aria-haspopup="dialog"
								aria-current={index === focused ? 'true' : undefined}
								onclick={() => press(index)}
							>
								<span class="visual" aria-hidden="true">
									<Chip tone="raised" class="project-badge">{project.badge}</Chip>
									<ProjectVisual kind={project.visual} />
								</span>
								<span class="title">{project.title}</span>
								<span class="line">{project.line}</span>
								<span class="category">{project.category}</span>
								<!-- Only the project in focus opens; its neighbours come into focus first. -->
								<span class="more text-link">
									Read More
									<ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
								</span>
							</button>
						</div>
					{/each}
				</div>
			</div>

			<p class="count">{projects.length} Projects</p>
		</div>
	</div>
</section>

<Modal bind:open label={detail.title}>
	<ProjectDetail project={detail} />
</Modal>

<style>
	.carousel {
		/* Width of one project, and the gap between two. */
		--slide: min(620px, 78vw);
		--gap: 24px;
		/* Height of the picture on each card. */
		--visual: 340px;
		--lift: 16px;
	}

	/* Full width of the screen, so the row runs off both edges instead of being cut short. */
	.viewport {
		padding-block: var(--lift);
		/* Until the carousel script is running, the row can still be scrolled by hand. */
		overflow-x: auto;
		scrollbar-width: none;
	}

	.viewport.ready {
		overflow: hidden;
	}

	.track {
		display: flex;
		touch-action: pan-y pinch-zoom;
	}

	.slide {
		flex: 0 0 var(--slide);
		min-width: 0;
		padding-inline: calc(var(--gap) / 2);
	}

	.card {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: 100%;
		padding: 0;
		border: 0;
		background: none;
		text-align: center;
		cursor: pointer;
		/* Out of focus: smaller and quieter. */
		opacity: 0.45;
		/* Keeps each card on its own graphics layer, so resizing one never redraws the others. */
		will-change: transform, opacity;
		transform: scale(0.88);
		transition:
			opacity 0.6s var(--ease),
			transform 0.6s var(--ease);
	}

	.slide.focused .card {
		opacity: 1;
		transform: none;
	}

	/* Only the project in focus plays its loop. The dimmed ones hold still, which keeps
	   swiping smooth on a phone. */
	.slide:not(.focused) :global(*),
	.carousel.moving :global(*) {
		animation-play-state: paused;
	}

	.card:focus-visible {
		border-radius: 28px;
	}

	.visual {
		position: relative;
		display: grid;
		place-items: center;
		height: var(--visual);
		overflow: hidden;
		border-radius: 28px;
		background: var(--surface);
	}

	.title {
		margin: 22px 0 4px;
		font-size: 24px;
		letter-spacing: -0.03em;
	}

	.line {
		max-width: 30em;
		margin-inline: auto;
		font-size: 17px;
		color: var(--ink-soft);
		text-wrap: balance;
	}

	.category {
		margin-top: 6px;
		font-size: 15.5px;
		color: var(--muted);
	}

	/* The cue that the focused project opens. Same look as "Read more" on the story cards. */

	.visual :global(.project-badge) {
		position: absolute;
		top: 18px;
		left: 18px;
	}

	/* The cue that the focused project opens. */
	.more {
		align-self: center;
		margin-top: 14px;
		opacity: 0;
		transition: opacity 0.6s var(--ease);
	}

	.slide.focused .more {
		opacity: 1;
	}

	.count {
		margin-top: 20px;
		font-size: 15.5px;
		font-weight: 600;
		color: var(--ink-soft);
		text-align: center;
	}

	@media (max-width: 860px) {
		.carousel {
			--visual: 300px;
		}

		/* The pictures are drawn for a wider card. On a phone they shrink a little and sit lower,
		   so none of them runs under the badge. */
		.visual > :global(:not(.project-badge)) {
			transform: translateY(14px) scale(0.86);
		}
	}
</style>
