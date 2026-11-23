<script lang="ts">
	import Download from '@lucide/svelte/icons/download';
	import { site } from '#lib/content/site.ts';
</script>

<header class="container bar">
	<a class="name" href="#intro">{site.name}</a>
	<!-- A file download, not an app route. -->
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<a class="resume" href={site.resume} download>
		Résumé
		<Download size={16} aria-hidden="true" />
	</a>
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
</header>

<style>
	.bar {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding-top: 24px;
	}

	.name {
		font-size: 19px;
		font-weight: 600;
		letter-spacing: -0.02em;
		text-decoration: none;
	}

	.resume {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 15.5px;
		color: var(--ink-soft);
		/* The underline is always there but see-through, so it can fade in on hover. */
		text-decoration: underline;
		text-decoration-color: transparent;
		text-underline-offset: 4px;
		transition:
			color 0.4s var(--ease),
			text-decoration-color 0.4s var(--ease);
	}

	.resume:hover {
		color: var(--ink);
		text-decoration-color: currentColor;
	}

	/* The download arrow dips, as if dropping the file. */
	.resume :global(svg) {
		transition: transform 0.4s var(--ease);
	}

	.resume:hover :global(svg) {
		transform: translateY(2px);
	}
</style>
