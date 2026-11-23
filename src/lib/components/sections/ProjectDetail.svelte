<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import type { Project } from '#lib/content/types.ts';
	import Button from '#lib/components/ui/Button.svelte';
	import Chip from '#lib/components/ui/Chip.svelte';

	/** Modal body for a project card. The same on desktop and phone. */
	let { project }: { project: Project } = $props();
</script>

<div class="category"><Chip tone="peach">{project.tag}</Chip></div>
<h2>{project.title}</h2>
<p class="summary">{project.summary}</p>

<h3 class="small-label">The problem</h3>
<p>{project.problem}</p>

<h3 class="small-label">What I built</h3>
<ul>
	{#each project.built as item (item)}
		<li>{item}</li>
	{/each}
</ul>

<h3 class="small-label">{project.outcome.label}</h3>
<p>{project.outcome.text}</p>

{#if project.link}
	<div class="link">
		<Button href={project.link.href} external variant="outline" icon={ArrowUpRight}>
			{project.link.label}
		</Button>
	</div>
{/if}

<style>
	.category {
		margin-bottom: 18px;
		padding-right: 64px;
	}

	h2 {
		font-size: clamp(32px, 3.4vw, 40px);
		line-height: 1.05;
		font-weight: 500;
		letter-spacing: -0.04em;
	}

	p {
		color: var(--ink-soft);
	}

	.summary {
		margin-top: 14px;
	}

	h3 {
		margin: 26px 0 8px;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		gap: 12px;
		padding: 12px 0;
		border-top: 1px solid var(--line);
	}

	li::before {
		content: '';
		flex: none;
		width: 8px;
		height: 8px;
		margin-top: 11px;
		border-radius: 50%;
		background: var(--ink-fill);
	}

	.link {
		margin-top: 28px;
	}
</style>
