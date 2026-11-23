import type { Story } from './types';

/** "Who I am": four stories, in the order Nao lived them. Copy is fixed by the content spec. */
export const stories: Story[] = [
	{
		id: 'grocery',
		tab: 'Family Grocery Store',
		headline: { lead: "It started with my family's", accent: 'grocery store.' },
		body: 'In 2021 my family opened a grocery store, and I got to be part of almost everything. I helped with the build-out and the suppliers, set up the till and the website, and worked on the marketing. Most of all I learned to look after customers, even on the days when something had gone wrong. It taught me how a business really works, one day at a time.',
		stats: [
			{ value: '2021', label: 'the year we opened' },
			{ value: '5 years', label: 'open, and still going' },
			{ value: '1st', label: 'business I helped build' }
		]
	},
	{
		id: 'learning',
		tab: '11 Learning Centers',
		headline: { lead: 'Then I spent a few years teaching kids to', accent: 'code.' },
		body: 'I started as an instructor, and it taught me how to really communicate with people. I built relationships with the families and the team around me, and slowly learned a business very different from the store. In time I became Center Director, looking after our families and their accounts, and sorting things out when something went wrong. Along the way I worked with our marketing team on the website and the ads that brought new families in.',
		stats: [
			{ value: '15', label: 'people on the team I led' },
			{ value: '500+', label: 'qualified leads a month' },
			{ value: '11', label: 'locations supported' }
		]
	},
	{
		id: 'restaurant',
		tab: 'Family Restaurant',
		headline: { lead: 'After that, my family opened a', accent: 'restaurant.' },
		body: 'Our second business, and a chance to bring along what the first one taught us. I helped with the build-out, the procedures and the team again, and this time much of the design was mine too: the interior, the menu, the logo and the marketing, all with what we had to work with. We were grateful to celebrate our first year this November.',
		stats: [
			{ value: '2nd', label: 'family business I helped build' },
			{ value: '1 year', label: 'open, as of November 2026' },
			{ value: 'Day one', label: 'involved from the build-out' }
		]
	},
	{
		id: 'gyms',
		tab: '17 Gyms',
		headline: { lead: 'Today I look after the systems behind', accent: '17 gyms.' },
		body: 'I work alongside the teams at a 17-location fitness company, keeping their CRM, memberships, sales and reporting connected, so people can spend less time on admin and more time with members.',
		stats: [
			{ value: '17', label: 'locations on these systems' },
			{ value: '280k', label: 'customer records' },
			{ value: '140+', label: 'CRM workflows built' }
		]
	}
];
