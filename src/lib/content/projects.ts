import type { Project } from './types';

/**
 * "What I've built": seven cards, in display order.
 *
 * Card copy comes from the spec's project table. Modal copy comes from the spec's case
 * studies, which win over the design files wherever the wording differs.
 * Only figures from the spec are used. Do not add, change or round any number.
 */
export const projects: Project[] = [
	{
		id: 'monody',
		visual: 'app',
		badge: 'Live product',
		title: 'Monody',
		line: 'A product designed and built from scratch',
		category: 'Product · design and code',
		summary: 'One system for running a gym, studio or school, designed and engineered end to end.',
		problem:
			'Membership businesses run on several disconnected tools for leads, members, classes and billing. Each has its own look and its own data.',
		built: [
			'The product, architecture and engineering, on SvelteKit, TypeScript and Postgres.',
			'A component-based design system that every screen is assembled from, so the whole product looks and behaves consistently.',
			'The public site at monody.app, including pricing, product pages and a demo flow.',
			'Onboarding for the first client location, with ad campaigns and landing pages feeding leads into its account.'
		],
		outcome: {
			label: 'Result',
			text: 'A live product and public site, with the first client location onboarded.'
		}
	},
	{
		id: 'landing-page',
		visual: 'landing',
		badge: 'Live site',
		title: 'A landing page that books trials',
		line: "A page and Google Ads that turn local parents into booked free sessions for a kids' coding centre",
		category: 'Monody client · landing page · ads',
		summary: "A kids' coding centre gets new families from one page and the ads that point to it.",
		problem:
			'The centre needed a steady way for local parents to find it, understand the programs, and book a first visit without a phone call.',
		built: [
			'A landing page with a three-step form that books two free sessions.',
			"Sections for camps, online and homeschool classes, and school pickup, so one page answers a parent's questions.",
			'Google Ads campaigns that send local parents to the page.',
			"Every booking lands in the centre's Monody account for follow-up."
		],
		outcome: {
			label: 'Status',
			text: 'Live since October 2026, with more locations planned.'
		},
		link: { label: 'Visit the live page', href: 'https://codeninjas.online' }
	},
	{
		id: 'reporting-app',
		visual: 'bars',
		badge: '17 locations',
		title: 'A daily reporting app',
		line: 'One dashboard, opened every day',
		category: 'Dashboard · design and code',
		summary:
			'Funnel, lead source and sales-rep performance in one place, designed for people who are not analysts.',
		problem:
			"Performance numbers were spread across the CRM, the sales platform and spreadsheets. Leaders had no single view, and each rep's results were hard to see fairly.",
		built: [
			'A web app on SvelteKit, TypeScript and Postgres, designed and built by me.',
			'Funnel reporting from lead to membership, and attribution showing where leads come from.',
			'Per-rep performance, with role-based access so each person sees what they should.',
			'A daily report email sent automatically.'
		],
		outcome: {
			label: 'Result',
			text: 'One place for leadership and sales to see performance each day, in place of manual reports.'
		}
	},
	{
		id: 'online-joining',
		visual: 'join',
		badge: 'All 17 locations live',
		title: 'Online joining',
		line: 'A full website and join flow, with live pricing for every location',
		category: 'Website · landing pages · API integration',
		summary:
			'A new member can join any location from the website, with the right price for that location, and no failed sign-up is lost.',
		problem:
			'Joining online needed to work for every location, each with its own pricing, and a failed payment or error meant a lost member nobody knew about.',
		built: [
			"The website's join flow connected directly to the membership system's API.",
			'Live pricing per location, so the site never shows a stale price.',
			'A ledger that records every failed join so staff can follow up.'
		],
		outcome: {
			label: 'Result',
			text: 'Online joining live for all 17 locations, with every failed attempt captured for follow-up.'
		}
	},
	{
		id: 'commissions',
		visual: 'ledger',
		badge: 'Running since August',
		title: 'Commission reporting',
		line: 'Payroll receives it every two weeks',
		category: 'Custom software',
		summary:
			'Sales commissions went from a manual job to statements that payroll receives every two weeks.',
		problem:
			'Commissions across 17 locations were worked out by hand each pay period. It was slow, hard to check, and disputes had no clear record.',
		built: [
			'The commission rules written as code, so every statement is calculated the same way.',
			'A frozen ledger: once a period closes, its numbers cannot change silently.',
			'Bi-weekly statements generated and sent to payroll.',
			'A claims process where a rep can dispute a line, with each ruling recorded.'
		],
		outcome: {
			label: 'Result',
			text: 'Statements have gone to payroll every pay period since August, and accounting receives the reports on schedule. Corrections go through the claims process, with each one recorded.'
		}
	},
	{
		id: 'system-sync',
		visual: 'sync',
		badge: '100k runs',
		title: 'Three systems, one truth',
		line: 'Systems that stay in sync on their own',
		category: 'Integration · automation',
		summary:
			"The CRM, the membership system and the sales platform now stay in sync on their own, and someone is told when they don't.",
		problem:
			'Leads, members and sales lived in three separate systems that disagreed with each other. Staff re-entered data and reports did not match.',
		built: [
			'A two-way sync between HubSpot, the membership system, the sales platform and a Postgres database.',
			'10 scheduled jobs, each with a heartbeat so a silent failure is noticed.',
			'A nightly health digest that runs 21 checks, with alerts for exceptions.',
			'Jobs gated to opening hours, so they do not run when nothing is changing.'
		],
		outcome: {
			label: 'Result',
			text: 'About 100,000 recorded runs in three months. Database writes cut by 82%. Building it in-house avoided about $8,640 a year in list-price licensing.'
		}
	},
	{
		id: 'mai',
		visual: 'agent',
		badge: 'Approval on every action',
		title: 'Mai, an AI agent',
		line: 'An assistant that helps run the day-to-day of a business, and asks before it acts',
		category: 'AI feature · in testing',
		summary:
			'An assistant that helps run the day-to-day of a business from inside the product, built so it cannot act without permission.',
		problem:
			'An AI assistant that can change customer records is useful and risky. It needs limits a business owner can trust.',
		built: [
			'An in-product agent on the Claude API, in Monody, a CRM for multi-location businesses.',
			'Every tool call validated against a schema before it runs.',
			'An approval card shown to the user before any action is taken.',
			'A daily spend cap.'
		],
		outcome: {
			label: 'Status',
			text: "Built and tested on Monody's own workspaces. Not yet released to customers."
		}
	}
];
