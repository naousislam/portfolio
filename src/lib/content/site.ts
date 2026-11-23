import Code from '@lucide/svelte/icons/code';
import FileText from '@lucide/svelte/icons/file-text';
import Mail from '@lucide/svelte/icons/mail';
import UserPlus from '@lucide/svelte/icons/user-plus';
import type { ContactLink, Headline } from './types';

export const site = {
	name: 'Naous Islam',
	url: 'https://naous.dev',
	title: 'Naous Islam: custom software, connected systems and automation for growing businesses',
	description:
		'I architect and build the systems a business runs on: custom software, connected systems and automation.',
	socialImageAlt:
		'Naous Islam: I architect and build the systems your business runs on. Custom software, connected systems and automation.',
	email: 'nao@naous.dev',
	// The public résumé. Its source is resume/resume.html.
	resume: '/resume.pdf',
	github: 'https://github.com/naousislam',
	linkedin: 'https://www.linkedin.com/in/naousislam'
} as const;

export const hero = {
	greeting: "Hi, I'm Nao. Software developer in Vancouver.",
	headline: {
		lead: 'I architect and build the systems your business',
		accent: 'runs on.'
	} satisfies Headline,
	supporting:
		'Custom software, connected systems and automation, built with care for how it looks and feels.',
	primary: 'Start a Project',
	secondary: 'See the Work'
};

export const contact = {
	linksHeading: 'More Info',
	heading: { lead: "Let's", accent: 'talk.' } satisfies Headline,
	line: "Tell me what's not working. I reply within two business days.",
	fields: {
		name: 'Name',
		email: 'Email',
		message: 'What would you like built?'
	},
	submit: 'Send Message',
	success: "Thanks. I've got your message and will reply within two business days.",
	failure: `Sorry, that didn't send. Please try again, or email me at ${site.email}.`,
	tooMany: `That's a lot of messages in a short time. Please try again later, or email me at ${site.email}.`,
	botCheckFailed: `The spam check didn't pass. Please try again, or email me at ${site.email}.`,
	privacy:
		'Your name, email and message are sent to my inbox so I can reply. Cloudflare checks the form for spam, and visits are counted without cookies.'
};

export const contactLinks: ContactLink[] = [
	{
		icon: Mail,
		label: site.email,
		hint: 'Opens your email app.',
		href: `mailto:${site.email}`,
		kind: 'internal'
	},
	{
		icon: FileText,
		label: 'Résumé',
		hint: 'Downloads a PDF.',
		href: site.resume,
		kind: 'download'
	},
	{
		icon: Code,
		label: 'GitHub',
		hint: 'My code, opens in a new tab.',
		href: site.github,
		kind: 'external'
	},
	{
		icon: UserPlus,
		label: 'LinkedIn',
		hint: 'Connect with me, opens in a new tab.',
		href: site.linkedin,
		kind: 'external'
	}
];

export const footer = {
	location: 'Vancouver, BC',
	credit: 'Designed and Built by Naous Islam'
};
