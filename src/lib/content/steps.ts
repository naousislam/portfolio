import type { Step } from './types';

/** "How I work": five steps. Also drawn as the loop in the Iteration modal. */
export const steps: Step[] = [
	{
		id: 'understand',
		title: 'Understand',
		sentence: 'I start by listening. How is the work done today, and where does it get hard?'
	},
	{
		id: 'propose',
		title: 'Propose',
		sentence: 'You get a clear proposal: what I would build, why, and what it will take.'
	},
	{
		id: 'design',
		title: 'Design',
		sentence: 'We look at the screens and the flow together, before any code is written.'
	},
	{
		id: 'build',
		title: 'Build',
		sentence: 'I build it, test it with you, and go back over the gaps until it feels right.'
	},
	{
		id: 'automate',
		title: 'Automate',
		sentence: 'Once we are both happy with it, I connect everything so it runs on its own.'
	}
];

/** The stepper moves on by itself at this pace until the visitor picks a step. */
export const STEP_INTERVAL_MS = 4200;
