<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { projects } from '#lib/content/projects.ts';
	import { pauseOffscreen, reveal } from '#lib/motion.ts';
	import Chip from '#lib/components/ui/Chip.svelte';
	import Modal from '#lib/components/ui/Modal.svelte';
	import SectionLabel from '#lib/components/ui/SectionLabel.svelte';
	import ProjectDetail from './ProjectDetail.svelte';
	import ProjectVisual from './ProjectVisual.svelte';

	/*
	 * A looping carousel: the project in focus sits in the middle at full size, its neighbours
	 * are smaller and dimmed, and the row runs off both edges of the screen.
	 *
	 * It is built on the browser's own scrolling (CSS scroll snap), not on script-driven
	 * movement. The browser handles a swipe on the graphics layer, so page code can never make
	 * it stutter. The size-and-fade of each card is tied to its scroll position in CSS too.
	 *
	 * Looping: the projects are laid out three times in a row and the visitor always starts in
	 * the middle copy. Whenever scrolling comes to rest in an outer copy, the row is moved by
	 * exactly one copy's width. The copies are identical, so nothing is seen to change.
	 */
	const COPIES = 3;
	const HOME_COPY = 1;
	const count = projects.length;
	const slides = Array.from({ length: COPIES * count }, (_, slide) => ({
		slide,
		copy: Math.floor(slide / count),
		index: slide % count,
		project: projects[slide % count]
	}));

	let row: HTMLDivElement;
	// The slide sitting in the middle of the screen, counted across all three copies.
	let centred = $state(HOME_COPY * count);
	const focused = $derived(centred % count);
	// True while the row is moving. The picture loops pause for that time.
	let moving = $state(false);

	let detail = $state(projects[0]);
	let open = $state(false);

	const slideAt = (slide: number) => row.children[slide] as HTMLElement;

	function centreOn(slide: number, behavior: ScrollBehavior) {
		const target = slideAt(slide);
		row.scrollTo({
			left: target.offsetLeft - (row.clientWidth - target.offsetWidth) / 2,
			behavior
		});
	}

	$effect(() => {
		centreOn(HOME_COPY * count, 'instant');

		// Slides are evenly spaced and the first one is centred at zero, so the slide in the
		// middle follows directly from how far the row has scrolled.
		const step = () => slideAt(1).offsetLeft - slideAt(0).offsetLeft;
		const readCentred = () => {
			const now = Math.round(row.scrollLeft / step());
			if (now !== centred) centred = now;
			return now;
		};

		// Once the row is at rest: resume the loops, and step back to the middle copy if needed.
		let restTimer: ReturnType<typeof setTimeout>;
		const atRest = () => {
			moving = false;
			const copy = Math.floor(readCentred() / count);
			if (copy !== HOME_COPY) {
				// An absolute scrollTo, not scrollBy: a relative scroll would be halted at the very
				// next slide by `scroll-snap-stop: always`.
				const left = row.scrollLeft + (HOME_COPY - copy) * count * step();
				row.scrollTo({ left, behavior: 'instant' });
				readCentred();
			}
		};
		const onScroll = () => {
			moving = true;
			readCentred();
			clearTimeout(restTimer);
			// "scrollend" is the precise signal; this timer covers browsers without it.
			restTimer = setTimeout(atRest, 160);
		};
		const onScrollEnd = () => {
			clearTimeout(restTimer);
			atRest();
		};

		row.addEventListener('scroll', onScroll, { passive: true });
		row.addEventListener('scrollend', onScrollEnd);
		return () => {
			clearTimeout(restTimer);
			row.removeEventListener('scroll', onScroll);
			row.removeEventListener('scrollend', onScrollEnd);
		};
	});
	function press(slide: number, index: number) {
		// A neighbour comes into focus first. The project already in focus opens its detail.
		if (slide !== centred) {
			centreOn(slide, 'smooth');
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
			<div class="row" bind:this={row}>
				{#each slides as { slide, copy, index, project } (slide)}
					<!-- The outer copies exist only so the row can loop; assistive tech reads the middle one. -->
					<div
						class={['slide', { focused: index === focused }]}
						data-slide={slide}
						aria-hidden={copy === HOME_COPY ? undefined : 'true'}
					>
						<button
							type="button"
							class="card"
							aria-haspopup="dialog"
							aria-current={slide === centred ? 'true' : undefined}
							tabindex={copy === HOME_COPY ? undefined : -1}
							onclick={() => press(slide, index)}
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

			<p class="count">{count} Projects</p>
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
		/* How small and how faint a project is while it is out of focus. */
		--small: 0.88;
		--dim: 0.45;
	}

	/*
	 * The scrolling row. It spans the full width of the screen, so the projects run off both
	 * edges. The side padding lets the first and last slide reach the centre.
	 */
	.row {
		position: relative;
		display: flex;
		padding: var(--lift) calc(50% - var(--slide) / 2);
		overflow-x: auto;
		overscroll-behavior-x: contain;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
	}

	.row::-webkit-scrollbar {
		display: none;
	}

	.slide {
		flex: 0 0 var(--slide);
		min-width: 0;
		padding-inline: calc(var(--gap) / 2);
		scroll-snap-align: center;
		/* One project per swipe, however hard the flick. This also keeps the loop seamless. */
		scroll-snap-stop: always;
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
		/* Out of focus: smaller and quieter. This class-based version is the fallback. */
		opacity: var(--dim);
		transform: scale(var(--small));
		transition:
			opacity 0.6s var(--ease),
			transform 0.6s var(--ease);
	}

	.slide.focused .card {
		opacity: 1;
		transform: none;
	}

	/*
	 * Where the browser supports it, the size and fade follow the card's position in the row
	 * directly: full size as it crosses the centre, small and dim towards the edges. The browser
	 * runs this on the graphics layer, in step with the finger.
	 */
	@supports (animation-timeline: view()) {
		.card,
		.slide.focused .card {
			transition: none;
			animation: come-into-focus linear both;
			animation-timeline: view(inline);
		}

		@keyframes come-into-focus {
			0%,
			30%,
			70%,
			100% {
				opacity: var(--dim);
				transform: scale(var(--small));
			}
			50% {
				opacity: 1;
				transform: none;
			}
		}
	}

	/* Only the project in focus plays its picture's loop, and not while the row is moving. */
	.slide:not(.focused) .visual :global(*),
	.carousel.moving .visual :global(*) {
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

	.visual :global(.project-badge) {
		position: absolute;
		top: 18px;
		left: 18px;
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
		/* On a phone the neighbours sit closer, larger and clearer, so a slice of each shows at
		   the screen edges and it is plain there is more to swipe to. */
		.carousel {
			--slide: 74vw;
			--gap: 10px;
			--visual: 300px;
			--small: 0.93;
			--dim: 0.6;
		}

		/* The pictures are drawn for a wider card. On a phone they shrink a little and sit lower,
		   so none of them runs under the badge. */
		.visual > :global(:not(.project-badge)) {
			transform: translateY(14px) scale(0.86);
		}
	}
</style>
