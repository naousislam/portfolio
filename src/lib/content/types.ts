import type ArrowRight from '@lucide/svelte/icons/arrow-right';
import type { SimpleIcon } from 'simple-icons';

/** Any Lucide icon component. */
export type Icon = typeof ArrowRight;

/** A headline whose last word or two are set in the italic serif accent. */
export interface Headline {
	lead: string;
	accent: string;
}

export interface Stat {
	value: string;
	label: string;
}

export interface Story {
	id: string;
	tab: string;
	headline: Headline;
	body: string;
	stats: [Stat, Stat, Stat];
}

export interface Step {
	id: 'understand' | 'propose' | 'design' | 'build' | 'automate';
	title: string;
	sentence: string;
}

export interface Tool {
	name: string;
	/** Official mark from Simple Icons. Omitted where the tool has no logo. */
	logo?: SimpleIcon;
	/** The tool's own website. Omitted for generic entries such as "SQL". */
	href?: string;
}

export interface SkillItem {
	icon: Icon;
	title: string;
	line: string;
}

export interface Skill {
	id: string;
	icon: Icon;
	title: string;
	line: string;
	lead: string;
	items: [SkillItem, SkillItem, SkillItem];
	tools: Tool[];
	/** Shows the five-step loop diagram in the modal. */
	loop?: boolean;
}

export type ProjectVisual = 'app' | 'landing' | 'bars' | 'join' | 'ledger' | 'sync' | 'agent';

export interface Project {
	id: string;
	visual: ProjectVisual;
	badge: string;
	title: string;
	line: string;
	category: string;
	/** A short form of the category for the chip in the detail view. Must fit one line on a phone. */
	tag: string;
	summary: string;
	problem: string;
	built: string[];
	outcome: { label: 'Result' | 'Status'; text: string };
	link?: { label: string; href: string };
}

export interface ContactLink {
	icon: Icon;
	label: string;
	hint: string;
	href: string;
	kind: 'internal' | 'download' | 'external';
}

/** What the contact form action returns. */
export interface ContactResult {
	success: boolean;
	/** Shown when the message could not be sent. */
	message?: string;
	errors?: Partial<Record<'name' | 'email' | 'message', string>>;
	values?: Partial<Record<'name' | 'email' | 'message', string>>;
}
