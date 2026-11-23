<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import Download from '@lucide/svelte/icons/download';
	import { contact, contactLinks } from '#lib/content/site.ts';
	import { reveal } from '#lib/motion.ts';
	import type { ContactLink, ContactResult } from '#lib/content/types.ts';
	import AccentHeadline from '#lib/components/ui/AccentHeadline.svelte';
	import IconBadge from '#lib/components/ui/IconBadge.svelte';
	import SectionLabel from '#lib/components/ui/SectionLabel.svelte';
	import ContactForm from './ContactForm.svelte';

	let { result = null }: { result?: ContactResult | null } = $props();

	const trailingIcon: Record<ContactLink['kind'], typeof ArrowRight> = {
		internal: ArrowRight,
		download: Download,
		external: ArrowUpRight
	};
</script>

<section id="contact" aria-label="Contact">
	<div class="container section">
		<SectionLabel>Contact</SectionLabel>

		<div class="columns">
			<div class="links" {@attach reveal(100)}>
				<h3>{contact.linksHeading}</h3>
				<ul>
					{#each contactLinks as link (link.label)}
						{@const Trailing = trailingIcon[link.kind]}
						<li>
							<!-- These are mailto, file and external links, not app routes. -->
							<!-- eslint-disable svelte/no-navigation-without-resolve -->
							<a
								href={link.href}
								download={link.kind === 'download' ? '' : undefined}
								target={link.kind === 'download' ? undefined : '_blank'}
								rel={link.kind === 'external' ? 'noopener' : undefined}
							>
								<IconBadge>
									<link.icon size={20} strokeWidth={1.9} aria-hidden="true" />
								</IconBadge>
								<span class="text">
									<span class="label">{link.label}</span>
									<span class="hint">{link.hint}</span>
								</span>
								<span class="trailing"><Trailing size={18} aria-hidden="true" /></span>
							</a>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
						</li>
					{/each}
				</ul>
			</div>

			<div class="talk" {@attach reveal(200)}>
				<h2><AccentHeadline headline={contact.heading} /></h2>
				<p class="line">{contact.line}</p>
				<ContactForm {result} />
			</div>
		</div>
	</div>
</section>

<style>
	.columns {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 56px 88px;
	}

	.links {
		flex: 1 1 320px;
		min-width: 0;
	}

	.links h3 {
		margin-bottom: 16px;
		font-size: 22px;
		font-weight: 500;
		letter-spacing: -0.025em;
	}

	ul {
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--line);
		list-style: none;
	}

	li {
		border-bottom: 1px solid var(--line);
	}

	/* The row is pulled out by its own padding so its content lines up with the heading,
	   and the dark hover fill has room to breathe around it. */
	a {
		display: flex;
		align-items: center;
		gap: 16px;
		margin: 0 -12px;
		padding: 16px 12px;
		border-radius: 18px;
		text-decoration: none;
		transition:
			background 0.4s var(--ease),
			color 0.4s var(--ease);
	}

	/* Hover: the same charcoal as the primary button, with light text. */
	a:hover {
		background: var(--ink-fill);
		color: var(--on-fill);
	}

	a:focus-visible {
		border-radius: 18px;
	}

	.trailing {
		display: grid;
		flex: none;
		color: var(--muted);
		transition:
			color 0.4s var(--ease),
			transform 0.4s var(--ease);
	}

	a:hover .trailing {
		color: var(--on-fill);
		/* Grows in place, so it never drifts toward the edge of the row. */
		transform: scale(1.2);
	}

	.text {
		flex: 1 1 0;
		min-width: 0;
	}

	.label {
		display: block;
		line-height: 1.25;
	}

	.hint {
		display: block;
		font-size: 15.5px;
		color: var(--muted);
		transition: color 0.4s var(--ease);
	}

	/* A softer shade of the row's own text colour, whichever theme that is. */
	a:hover .hint {
		color: color-mix(in srgb, var(--on-fill) 72%, transparent);
	}

	.talk {
		flex: 1.2 1 380px;
		min-width: 0;
	}

	h2 {
		margin-bottom: 20px;
		font-size: clamp(40px, 5.4vw, 80px);
		line-height: 1;
		font-weight: 500;
		letter-spacing: -0.05em;
	}

	.line {
		margin-bottom: 28px;
		color: var(--ink-soft);
	}
</style>
