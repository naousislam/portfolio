<script lang="ts">
	import '@fontsource-variable/instrument-sans';
	import '@fontsource/instrument-serif/400-italic.css';
	import '../app.css';
	import { dev } from '$app/env';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	{#if !dev}
		<!-- Vercel Web Analytics: cookieless visit counts. Turn it on in the Vercel project. -->
		<script defer src="/_vercel/insights/script.js"></script>
	{/if}
</svelte:head>

{@render children()}
