<script lang="ts">
	import { site } from '#lib/content/site.ts';
	import SectionNav from '#lib/components/SectionNav.svelte';
	import Contact from '#lib/components/sections/Contact.svelte';
	import Footer from '#lib/components/sections/Footer.svelte';
	import Hero from '#lib/components/sections/Hero.svelte';
	import Process from '#lib/components/sections/Process.svelte';
	import Projects from '#lib/components/sections/Projects.svelte';
	import Skills from '#lib/components/sections/Skills.svelte';
	import Stories from '#lib/components/sections/Stories.svelte';

	const socialImage = `${site.url}/og.png`;

	// Structured data: tells search engines who this site is about.
	const person = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: site.name,
		url: site.url,
		image: socialImage,
		jobTitle: 'Software developer',
		description: site.description,
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Vancouver',
			addressRegion: 'BC',
			addressCountry: 'CA'
		},
		sameAs: [site.github, site.linkedin]
	};
	// "<" is escaped so nothing in the data can close the script tag early.
	const personJson = JSON.stringify(person).replaceAll('<', '\\u003c');
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
	<meta name="author" content={site.name} />
	<link rel="canonical" href={site.url} />

	<!-- Link previews on LinkedIn, Slack, iMessage and the like. -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:locale" content="en_CA" />
	<meta property="og:url" content={site.url} />
	<meta property="og:title" content={site.title} />
	<meta property="og:description" content={site.description} />
	<meta property="og:image" content={socialImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={site.socialImageAlt} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={site.title} />
	<meta name="twitter:description" content={site.description} />
	<meta name="twitter:image" content={socialImage} />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -- our own JSON, escaped above -->
	{@html `<script type="application/ld+json">${personJson}</` + `script>`}
</svelte:head>

<main>
	<Hero />
	<Stories />
	<Process />
	<Skills />
	<Projects />
	<Contact />
</main>
<Footer />
<SectionNav />
