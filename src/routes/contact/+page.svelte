<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '#lib/content/site.ts';
	import Contact from '#lib/components/sections/Contact.svelte';
	import Footer from '#lib/components/sections/Footer.svelte';
	import type { ContactResult } from '#lib/content/types.ts';

	// Where the contact form lands when it is submitted without JavaScript.
	let { form }: { form: ContactResult | null } = $props();
</script>

<svelte:head>
	<title>Contact · {site.name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<header class="container bar">
	<a href={resolve('/')}>{site.name}</a>
</header>
<main>
	<Contact result={form} />
</main>
<Footer />

<style>
	.bar {
		padding-top: 24px;
	}

	.bar a {
		font-size: 19px;
		font-weight: 600;
		letter-spacing: -0.02em;
		text-decoration: none;
	}
</style>
