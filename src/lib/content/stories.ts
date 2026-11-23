import type { Story } from './types';

/** "Who I am": five stories, in the order Nao lived them. Copy is fixed by the content spec. */
export const stories: Story[] = [
	{
		id: 'code',
		tab: 'Learning to Code',
		headline: { lead: "I've always been the one asking how things", accent: 'work.' },
		body: 'I started coding in grade 10 and studied computer science in college, but I learned the most by building things. I always wanted to know the next piece: how a page is styled, how it does something, where it lives, and how it stays fast and secure. In my first year I built the back end of an online store on my own, just to see how one works. Building was the easier half. The harder half was getting people to use what I had built, and earning their trust that it was safe and worth using. I left school to help my family and to build things people use every day. Today AI tools let me build far more, because I know how the pieces should fit together.',
		stats: [
			{ value: '10th', label: 'Grade I Started Coding' },
			{ value: 'Year 1', label: 'Built an Online Store' },
			{ value: '74.4k', label: 'Views on My Linux Guide' }
		]
	},
	{
		id: 'grocery',
		tab: 'Family Grocery Store',
		headline: { lead: "It started with my family's", accent: 'grocery store.' },
		body: 'In 2021 my family opened a grocery store, and I got to be part of almost everything. I helped with the build-out and the suppliers, set up the till and the website, and worked on the marketing. Most of all I learned to look after customers, even on the days when something had gone wrong. It taught me how a business really works, one day at a time.',
		stats: [
			{ value: '2021', label: 'The Year We Opened' },
			{ value: '5 Years', label: 'Open, and Still Going' },
			{ value: '1st', label: 'Business I Helped Build' }
		]
	},
	{
		id: 'learning',
		tab: '11 Learning Centers',
		headline: { lead: 'Then I spent a few years teaching kids to', accent: 'code.' },
		body: 'I started as an instructor, and it taught me how to really communicate with people. I built relationships with the families and the team around me, and slowly learned a business very different from the store. In time I became Center Director, looking after our families and their accounts, and sorting things out when something went wrong. Along the way I saw that our website could bring in more families, so I built a new landing page on my own time, unasked and unpaid. Building it was the smaller part. I sat down with leadership, listened to what they wanted, and walked them through what I had made until they were ready to try it. It went on to bring in leads for all 11 locations.',
		stats: [
			{ value: '15', label: 'People on the Team I Led' },
			{ value: '500+', label: 'Qualified Leads a Month' },
			{ value: '11', label: 'Locations Supported' }
		]
	},
	{
		id: 'restaurant',
		tab: 'Family Restaurant',
		headline: { lead: 'After that, my family opened a', accent: 'restaurant.' },
		body: 'Our second business, and a chance to bring along what the first one taught us. I helped with the build-out, the procedures and the team again, and this time much of the design was mine too: the interior, the menu, the logo and the marketing, all with what we had to work with. We were grateful to celebrate our first year this November.',
		stats: [
			{ value: '2nd', label: 'Family Business I Helped Build' },
			{ value: '1 Year', label: 'Open, as of November 2026' },
			{ value: 'Day One', label: 'Involved from the Build-Out' }
		]
	},
	{
		id: 'gyms',
		tab: '17 Gyms',
		headline: { lead: 'Today I look after the systems behind', accent: '17 gyms.' },
		body: 'I work alongside the teams at a 17-location fitness company, keeping their CRM, memberships, sales and reporting connected, so people can spend less time on admin and more time with members.',
		stats: [
			{ value: '17', label: 'Locations on These Systems' },
			{ value: '280k', label: 'Customer Records' },
			{ value: '140+', label: 'CRM Workflows Built' }
		]
	}
];
