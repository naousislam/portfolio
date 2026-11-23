<script lang="ts">
	import type { Skill, Tool } from '#lib/content/types.ts';
	import IconBadge from '#lib/components/ui/IconBadge.svelte';
	import LoopDiagram from './LoopDiagram.svelte';

	/** Modal body for a "What I work with" tile. Words only: no product screenshots. */
	let { skill }: { skill: Skill } = $props();
</script>

{#snippet chip(tool: Tool)}
	{#if tool.logo}
		<!-- Official mark from Simple Icons, never redrawn by hand. -->
		<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
			<path d={tool.logo.path} />
		</svg>
	{/if}
	{tool.name}
{/snippet}

<h2>{skill.title}</h2>
<p class="lead">{skill.lead}</p>

{#if skill.loop}
	<LoopDiagram />
{/if}

<ul class="items">
	{#each skill.items as item (item.title)}
		<li>
			<IconBadge><item.icon size={20} strokeWidth={1.8} aria-hidden="true" /></IconBadge>
			<div>
				<div class="title">{item.title}</div>
				<div class="line">{item.line}</div>
			</div>
		</li>
	{/each}
</ul>

{#if skill.tools.length}
	<h3 class="tools-label small-label">Tools</h3>
	<ul class="tools">
		{#each skill.tools as tool (tool.name)}
			<li>
				{#if tool.href}
					<!-- An external site, not an app route. -->
					<!-- eslint-disable svelte/no-navigation-without-resolve -->
					<a class="tool" href={tool.href} target="_blank" rel="noopener">
						{@render chip(tool)}
						<span class="visually-hidden">(opens in a new tab)</span>
					</a>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
				{:else}
					<span class="tool">{@render chip(tool)}</span>
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style>
	h2 {
		padding-right: 64px;
		font-size: clamp(30px, 3.4vw, 46px);
		line-height: 1.05;
		font-weight: 500;
		letter-spacing: -0.04em;
	}

	.lead {
		max-width: 520px;
		margin-top: 14px;
		color: var(--ink-soft);
	}

	.items {
		margin: 28px 0 0;
		padding: 0;
		list-style: none;
	}

	.items li {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 16px 0;
		border-top: 1px solid var(--line);
	}

	.title {
		font-size: 19px;
		letter-spacing: -0.02em;
	}

	.line {
		margin-top: 2px;
		font-size: 16px;
		color: var(--muted);
	}

	/* Same small label style as "The problem" and "What I built" in the project modals. */
	.tools-label {
		margin: 26px 0 10px;
		padding-top: 22px;
		border-top: 1px solid var(--line);
	}

	.tools {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.tool {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		height: 38px;
		padding: 0 16px;
		border: 1px solid var(--line);
		border-radius: 999px;
		font-size: 15.5px;
		text-decoration: none;
	}

	a.tool {
		transition:
			background 0.4s var(--ease),
			border-color 0.4s var(--ease);
	}

	a.tool:hover {
		border-color: var(--peach);
		background: var(--peach);
		color: var(--on-peach);
	}

	a.tool:focus-visible {
		border-radius: 999px;
	}

	.tool svg {
		flex: none;
	}
</style>
