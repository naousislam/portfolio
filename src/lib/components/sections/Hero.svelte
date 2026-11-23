<script lang="ts">
	import portrait from '#lib/assets/portrait.png?enhanced';
	import { hero } from '#lib/content/site.ts';
	import { pauseOffscreen } from '#lib/motion.ts';
	import AccentHeadline from '#lib/components/ui/AccentHeadline.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import TopBar from './TopBar.svelte';
</script>

<section id="intro" class="hero" {@attach pauseOffscreen()}>
	<TopBar />

	<!-- The portrait in its peach circle, with slow orbiting rings around it. -->
	<div class="portrait" aria-hidden="true">
		<svg class="rings" viewBox="0 0 900 900">
			<g fill="none" style="stroke: var(--ring)" stroke-width="1.5">
				<circle cx="450" cy="450" r="170" />
				<circle cx="450" cy="450" r="290" />
				<circle cx="450" cy="450" r="410" />
			</g>
			<g class="orbit continuous" style:--duration="60s">
				<circle cx="450" cy="280" r="9" style="fill: var(--ink-fill)" />
				<circle cx="620" cy="450" r="5" style="fill: var(--line-strong)" />
			</g>
			<g class="orbit back continuous" style:--duration="90s">
				<circle cx="740" cy="450" r="7" style="fill: var(--faint)" />
				<circle cx="450" cy="740" r="12" style="fill: var(--ring)" />
			</g>
			<g class="orbit continuous" style:--duration="140s">
				<circle cx="450" cy="40" r="6" style="fill: var(--line-strong)" />
			</g>
		</svg>
		<div class="circle">
			<enhanced:img
				src={portrait}
				alt=""
				sizes="(min-width: 861px) 360px, 300px"
				fetchpriority="high"
			/>
		</div>

		<!--
			Three small cards ride the rings in front of the photo: a chart, connected systems
			and an approval step. Each sits in an orbiting group and spins the opposite way at
			the same speed, so it travels around the circle but always stays upright.
		-->
		<svg class="cards" viewBox="0 0 900 900">
			<g class="orbit back continuous" style:--duration="90s">
				<g transform="translate(185 201)">
					<g class="card upright continuous">
						<rect width="120" height="88" rx="16" />
						<rect x="18" y="50" width="12" height="22" rx="3" style="fill: var(--ring)" />
						<rect x="36" y="38" width="12" height="34" rx="3" style="fill: var(--ring)" />
						<rect x="54" y="44" width="12" height="28" rx="3" style="fill: var(--ring)" />
						<rect x="72" y="20" width="12" height="52" rx="3" style="fill: var(--ink-fill)" />
						<rect x="90" y="32" width="12" height="40" rx="3" style="fill: var(--peach)" />
					</g>
				</g>
			</g>
			<g class="orbit continuous" style:--duration="140s">
				<g transform="translate(800 406)">
					<g class="card upright back continuous">
						<rect width="120" height="88" rx="16" />
						<rect x="16" y="34" width="20" height="20" rx="6" style="fill: var(--peach)" />
						<path d="M36 44h14M70 44h14" style="stroke: var(--line-strong)" stroke-width="2" />
						<rect x="50" y="30" width="20" height="28" rx="8" style="fill: var(--ink-fill)" />
						<rect x="84" y="34" width="20" height="20" rx="6" style="fill: var(--ring)" />
					</g>
				</g>
				<g transform="translate(100 696)">
					<g class="card upright back continuous">
						<rect width="120" height="88" rx="16" />
						<rect x="18" y="20" width="70" height="7" rx="3.5" style="fill: var(--line-strong)" />
						<rect x="18" y="34" width="46" height="7" rx="3.5" style="fill: var(--line-strong)" />
						<rect x="18" y="54" width="42" height="16" rx="8" style="fill: var(--ink-fill)" />
						<rect x="66" y="54" width="30" height="16" rx="8" style="fill: var(--peach)" />
					</g>
				</g>
			</g>
		</svg>
	</div>

	<div class="container copy">
		<p class="greeting">{hero.greeting}</p>
		<h1><AccentHeadline headline={hero.headline} /></h1>
		<p class="supporting">{hero.supporting}</p>
		<div class="actions">
			<Button href="#contact">{hero.primary}</Button>
			<Button href="#work" variant="outline" class="only-desktop">{hero.secondary}</Button>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		flex-direction: column;
		/* Fills the screen, within limits, so the copy sits in the middle of what the visitor
		   sees first, with the same space above it as below. */
		min-height: clamp(680px, 100svh, 1100px);
		overflow: hidden;
	}

	/* A square that holds the rings; the photo circle sits in its centre. */
	.portrait {
		position: absolute;
		top: 52%;
		/*
		 * On ordinary screens the portrait sits 3% in from the right edge. On wide screens that
		 * would drift far from the text, so it is tied to the page column instead: the photo's
		 * right edge lines up with the content's right edge and the rings spill past it.
		 */
		right: max(3%, calc((100% - var(--page-max)) / 2 - 120px));
		display: grid;
		place-items: center;
		width: min(660px, 54%);
		aspect-ratio: 1 / 1;
		transform: translateY(-50%);
		pointer-events: none;
	}

	.rings,
	.cards {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.cards {
		overflow: visible;
	}

	.card {
		filter: drop-shadow(0 14px 18px rgba(20, 22, 26, 0.12));
	}

	.card > rect:first-child {
		fill: var(--card);
		stroke: var(--ring);
		stroke-width: 1.5;
	}

	/* Cancels the orbit's turn, around the card's own centre. */
	.upright {
		transform-box: fill-box;
		transform-origin: center;
		animation: spin var(--duration) linear infinite;
	}

	.upright.back {
		animation-name: spin-back;
	}

	.orbit {
		transform-origin: 450px 450px;
		animation: spin var(--duration) linear infinite;
	}

	.orbit.back {
		animation-name: spin-back;
	}

	.circle {
		position: relative;
		width: 54%;
		aspect-ratio: 1 / 1;
		overflow: hidden;
		border-radius: 50%;
		/* The photo keeps its light peach backdrop in both themes. */
		background: radial-gradient(circle at 35% 25%, #fffaf5 0%, #fff0e4 85%);
	}

	.circle :global(picture) {
		display: contents;
	}

	.circle :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		/* The portrait sits slightly desaturated against the peach. */
		filter: saturate(0.88);
	}

	.copy {
		position: relative;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		justify-content: center;
		padding-top: 56px;
		padding-bottom: 56px;
	}

	.greeting {
		margin-bottom: 18px;
		font-size: 18px;
		color: var(--muted);
		animation: rise 0.8s ease both;
	}

	h1 {
		max-width: 560px;
		font-size: clamp(36px, 4.6vw, 64px);
		line-height: 1.05;
		font-weight: 500;
		letter-spacing: -0.035em;
		animation: rise 0.9s ease 0.1s both;
	}

	.supporting {
		max-width: 440px;
		margin-top: 22px;
		font-size: 20px;
		color: var(--ink-soft);
		animation: rise 0.9s ease 0.2s both;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 32px;
		animation: rise 0.9s ease 0.3s both;
	}

	/*
	 * Phone: the portrait drops below the copy and is centred. Its square is wider than the
	 * screen so the outer ring runs off both edges, and the rings themselves are the breathing
	 * room: the photo ends up the same distance from the button above as from the next
	 * section's label below.
	 */
	@media (max-width: 860px) {
		/* Moving shadows are expensive on a phone; the cards' outline is enough there. */
		.card {
			filter: none;
		}

		.hero {
			min-height: 0;
			/* The next section's own top gap would double the space under the photo. */
			margin-bottom: calc(var(--section-gap) / -2);
		}

		.portrait {
			position: relative;
			top: auto;
			right: auto;
			order: 3;
			flex: none;
			align-self: center;
			width: min(520px, 138vw);
			transform: none;
		}

		.copy {
			flex-grow: 0;
			padding-bottom: 0;
		}
	}
</style>
