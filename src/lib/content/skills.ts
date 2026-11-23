import Bell from '@lucide/svelte/icons/bell';
import BookOpen from '@lucide/svelte/icons/book-open';
import Calculator from '@lucide/svelte/icons/calculator';
import ChartColumn from '@lucide/svelte/icons/chart-column';
import CircleCheck from '@lucide/svelte/icons/circle-check';
import Clock from '@lucide/svelte/icons/clock';
import Database from '@lucide/svelte/icons/database';
import Eye from '@lucide/svelte/icons/eye';
import FileText from '@lucide/svelte/icons/file-text';
import Funnel from '@lucide/svelte/icons/funnel';
import LayoutGrid from '@lucide/svelte/icons/layout-grid';
import Lock from '@lucide/svelte/icons/lock';
import MessageCircle from '@lucide/svelte/icons/message-circle';
import MessageSquare from '@lucide/svelte/icons/message-square';
import Monitor from '@lucide/svelte/icons/monitor';
import PenTool from '@lucide/svelte/icons/pen-tool';
import RefreshCw from '@lucide/svelte/icons/refresh-cw';
import Repeat from '@lucide/svelte/icons/repeat';
import RotateCw from '@lucide/svelte/icons/rotate-cw';
import Server from '@lucide/svelte/icons/server';
import Shield from '@lucide/svelte/icons/shield';
import Sparkles from '@lucide/svelte/icons/sparkles';
import Tag from '@lucide/svelte/icons/tag';
import Upload from '@lucide/svelte/icons/upload';
import Users from '@lucide/svelte/icons/users';
import Workflow from '@lucide/svelte/icons/workflow';
import {
	siBun,
	siClaude,
	siClaudecode,
	siDrizzle,
	siHubspot,
	siNeon,
	siNodedotjs,
	siPostgresql,
	siPython,
	siSvelte,
	siTailwindcss,
	siTypescript
} from 'simple-icons';
import type { Skill } from './types';

/** "What I work with": eight tiles, each opening a modal. Copy is fixed by the content spec. */
export const skills: Skill[] = [
	{
		id: 'design',
		icon: PenTool,
		title: 'Design',
		line: 'Product Screens, Design Systems, Landing Pages',
		lead: 'Screens and systems that people use all day, designed to feel calm and clear.',
		items: [
			{
				icon: LayoutGrid,
				title: 'A Design System',
				line: 'One set of components behind every screen of a product'
			},
			{
				icon: ChartColumn,
				title: 'A Reporting Dashboard',
				line: 'Built for people who are not analysts'
			},
			{
				icon: FileText,
				title: 'Campaign Pages',
				line: 'About 5,500 RSVPs for an event across 17 locations'
			}
		],
		tools: []
	},
	{
		id: 'front-end',
		icon: Monitor,
		title: 'Front End',
		line: 'SvelteKit, Svelte 5, TypeScript, Tailwind',
		lead: 'Fast, responsive interfaces that work as well on a phone as on a desk.',
		items: [
			{
				icon: Monitor,
				title: 'A Full Web App',
				line: 'Product screens built from the design system'
			},
			{
				icon: Funnel,
				title: 'An Analytics App',
				line: 'Funnel, attribution and per-person views'
			},
			{ icon: Tag, title: 'An Online Join Flow', line: 'Live pricing for every location' }
		],
		tools: [
			{ name: 'SvelteKit', logo: siSvelte, href: 'https://svelte.dev/docs/kit' },
			{ name: 'Svelte 5', logo: siSvelte, href: 'https://svelte.dev' },
			{ name: 'TypeScript', logo: siTypescript, href: 'https://www.typescriptlang.org' },
			{ name: 'Tailwind', logo: siTailwindcss, href: 'https://tailwindcss.com' }
		]
	},
	{
		id: 'back-end',
		icon: Server,
		title: 'Back End',
		line: 'APIs, Auth, Roles, Node, Bun, Python',
		lead: 'The rules, APIs and access control that sit behind the screens.',
		items: [
			{
				icon: Calculator,
				title: 'A Commission Engine',
				line: 'Rules written in code, with a frozen ledger'
			},
			{
				icon: Lock,
				title: 'Role-Based APIs',
				line: 'Each person sees only what they should'
			},
			{
				icon: Server,
				title: 'Serverless Endpoints',
				line: '20 running behind a 119-page site'
			}
		],
		tools: [
			{ name: 'Node', logo: siNodedotjs, href: 'https://nodejs.org' },
			{ name: 'Bun', logo: siBun, href: 'https://bun.sh' },
			{ name: 'Python', logo: siPython, href: 'https://www.python.org' }
		]
	},
	{
		id: 'data',
		icon: Database,
		title: 'Data',
		line: 'Postgres, Neon, Drizzle, SQL Reporting',
		lead: 'Schemas, queries and reports that stay fast and stay trusted.',
		items: [
			{
				icon: Database,
				title: 'Reporting Schemas',
				line: 'Data models built for analytics'
			},
			{
				icon: Funnel,
				title: 'Funnel and Attribution',
				line: 'From first lead to membership'
			},
			{
				icon: Clock,
				title: '82% Fewer Writes',
				line: 'Jobs that only run during opening hours'
			}
		],
		tools: [
			{ name: 'Postgres', logo: siPostgresql, href: 'https://www.postgresql.org' },
			{ name: 'Neon', logo: siNeon, href: 'https://neon.com' },
			{ name: 'Drizzle', logo: siDrizzle, href: 'https://orm.drizzle.team' },
			{ name: 'SQL' }
		]
	},
	{
		id: 'automation',
		icon: RotateCw,
		title: 'Automation',
		line: 'Background Jobs, Syncs, HubSpot, Ad Platforms',
		lead: 'The work that happens between systems, without anyone having to remember it.',
		items: [
			{
				icon: RefreshCw,
				title: 'A Two-Way CRM Sync',
				line: '10 scheduled jobs, each with a heartbeat'
			},
			{
				icon: Bell,
				title: 'A Nightly Health Digest',
				line: '21 checks, with alerts only on exceptions'
			},
			{
				icon: Workflow,
				title: '140+ CRM Workflows',
				line: 'Lead intake, routing and follow-up'
			}
		],
		tools: [
			{ name: 'HubSpot', logo: siHubspot, href: 'https://www.hubspot.com' },
			{ name: 'Ad Platforms' },
			{ name: 'Scheduled Jobs' }
		]
	},
	{
		id: 'ai',
		icon: Sparkles,
		title: 'AI',
		line: 'Agents with Approval Steps, Claude, Claude Code',
		lead: 'Assistants that can act for you, within limits you can trust.',
		items: [
			{
				icon: CircleCheck,
				title: 'Mai',
				line: 'An assistant that asks for approval before every action'
			},
			{
				icon: Users,
				title: 'A Multi-Agent Workflow',
				line: 'One agent plans, others build small scoped tasks'
			},
			{
				icon: BookOpen,
				title: 'Written Rules',
				line: '23 procedures the agents work under'
			}
		],
		tools: [
			{ name: 'Claude', logo: siClaude, href: 'https://claude.com' },
			{ name: 'Claude Code', logo: siClaudecode, href: 'https://claude.com/claude-code' }
		]
	},
	{
		id: 'communication',
		icon: MessageCircle,
		title: 'Communication',
		line: 'Plain Updates, Clear Docs, Walkthroughs',
		lead: 'Making sure everyone knows what is happening, and why.',
		items: [
			{
				icon: Users,
				title: 'Team Training',
				line: 'Hiring and training instructors and staff'
			},
			{
				icon: MessageSquare,
				title: 'Teaching the Tools',
				line: 'Showing colleagues how to find their own answers'
			},
			{
				icon: FileText,
				title: 'Handover Docs',
				line: 'Procedures and write-ups anyone can follow'
			}
		],
		tools: []
	},
	{
		id: 'iteration',
		icon: Repeat,
		title: 'Iteration',
		line: 'Short Loops, Real Feedback, Tested Each Round',
		lead: 'The same five steps, repeated in short loops until it feels right.',
		items: [
			{
				icon: Upload,
				title: 'Small Changes, Shipped Often',
				line: '2,100+ changes across four codebases'
			},
			{
				icon: Eye,
				title: 'Every Change Reviewed',
				line: 'Checked and approved before release'
			},
			{
				icon: Shield,
				title: 'Rules from Mistakes',
				line: 'Each problem ends in a written rule'
			}
		],
		tools: [],
		loop: true
	}
];
