<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { skills } from '#lib/content/skills.ts';
	import { reveal } from '#lib/motion.ts';
	import Modal from '#lib/components/ui/Modal.svelte';
	import SectionLabel from '#lib/components/ui/SectionLabel.svelte';
	import SkillDetail from './SkillDetail.svelte';

	// `selected` stays set while the modal closes, so its content does not vanish mid-fade.
	let selected = $state(skills[0]);
	let open = $state(false);

	function show(index: number) {
		selected = skills[index];
		open = true;
	}
</script>

<section id="skills" aria-label="What I work with">
	<div class="container section">
		<SectionLabel>What I work with</SectionLabel>

		<div class="grid" {@attach reveal(100)}>
			{#each skills as skill, index (skill.id)}
				<button type="button" class="tile" aria-haspopup="dialog" onclick={() => show(index)}>
					<span class="icon"><skill.icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
					<span class="title">{skill.title}</span>
					<span class="line">{skill.line}</span>
					<span class="more">
						<span class="more-text">See more</span>
						<ArrowRight size={16} aria-hidden="true" />
					</span>
				</button>
			{/each}
		</div>
	</div>
</section>

<Modal bind:open label={selected.title}>
	<SkillDetail skill={selected} />
</Modal>

<style>
	/* "What I work with" follows "How I work" a little more closely than a full section gap. */
	.section {
		padding-top: calc(var(--section-gap) / 2 - 24px);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1px;
		overflow: hidden;
		border: 1px solid var(--line);
		border-radius: 28px;
		background: var(--line);
	}

	.tile {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 30px;
		border: 0;
		background: var(--bg);
		text-align: left;
		cursor: pointer;
		transition: background 0.5s var(--ease);
	}

	.tile:hover {
		background: var(--peach-hover);
	}

	.tile:focus-visible {
		outline-offset: -4px;
		border-radius: 24px;
	}

	.icon {
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: var(--surface);
		transition:
			background 0.45s var(--ease),
			color 0.45s var(--ease),
			transform 0.45s var(--ease);
	}

	.tile:hover .icon {
		background: var(--ink-fill);
		color: var(--on-fill);
		transform: scale(1.06);
	}

	.title {
		margin: 20px 0 6px;
		font-size: 22px;
		letter-spacing: -0.025em;
	}

	.line {
		font-size: 16.5px;
		color: var(--muted);
	}

	.more {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-top: 18px;
		font-size: 15.5px;
		opacity: 0;
		transform: translateY(6px);
		transition:
			opacity 0.5s var(--ease),
			transform 0.5s var(--ease);
	}

	.tile:hover .more,
	.tile:focus-visible .more {
		opacity: 1;
		transform: none;
	}

	@media (max-width: 1040px) and (min-width: 861px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	/* Phone: a single-column list with icon, title, one line and an arrow per row. */
	@media (max-width: 860px) {
		.section {
			padding-top: calc(var(--section-gap) / 2);
		}

		.grid {
			grid-template-columns: minmax(0, 1fr);
		}

		.tile {
			display: grid;
			grid-template-columns: 48px minmax(0, 1fr) 20px;
			column-gap: 16px;
			align-items: center;
			padding: 18px 20px;
		}

		.icon {
			grid-row: 1 / span 2;
		}

		.title {
			grid-row: 1;
			grid-column: 2;
			margin: 0;
			font-size: 20px;
		}

		.line {
			grid-row: 2;
			grid-column: 2;
			margin-top: 2px;
			font-size: 15px;
		}

		.more {
			grid-row: 1 / span 2;
			grid-column: 3;
			margin: 0;
			opacity: 1;
			transform: none;
		}

		.more-text {
			display: none;
		}
	}
</style>
