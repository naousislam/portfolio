<script lang="ts">
	import type { ProjectVisual } from '#lib/content/types.ts';

	/**
	 * The abstract illustration on a project card. These are drawn shapes, never screenshots:
	 * nothing here comes from an employer's or client's system.
	 *
	 * Each one plays a small loop of its own, all the time. Nothing reacts to the pointer.
	 */
	let { kind }: { kind: ProjectVisual } = $props();

	const barHeights = [36, 52, 44, 70, 100, 64];
	const ledgerRows = [
		{ label: 38, amount: 18 },
		{ label: 46, amount: 14 },
		{ label: 30, amount: 20 }
	];
</script>

{#if kind === 'app'}
	<div class="app shadow">
		<div class="sidebar">
			<span class="dark"></span><span></span><span></span><span></span>
		</div>
		<div class="panels">
			<div class="peach"></div>
			<div></div>
			<div class="span"></div>
		</div>
	</div>
{:else if kind === 'landing'}
	<div class="landing shadow">
		<div class="heading"></div>
		<div class="sub"></div>
		<div class="field"></div>
		<div class="field"></div>
		<div class="cta"></div>
		<div class="pager"><span class="on"></span><span></span><span></span></div>
	</div>
{:else if kind === 'bars'}
	<div class="bars">
		{#each barHeights as height, index (index)}
			<div
				class={['bar', { dark: height === 100, peach: index === barHeights.length - 1 }]}
				style:height="{height}%"
				style:--i={index}
			></div>
		{/each}
	</div>
{:else if kind === 'join'}
	<div class="join shadow">
		<div class="progress"><span class="on"></span><span class="on"></span><span></span></div>
		<div class="heading"></div>
		<div class="option"></div>
		<div class="option chosen"></div>
		<div class="spacer"></div>
		<div class="cta"></div>
	</div>
{:else if kind === 'ledger'}
	<div class="ledger">
		{#each ledgerRows as row, index (row.label)}
			<div class="entry" style:--i={index}>
				<span style:width="{row.label}%"></span>
				<span class="amount" style:width="{row.amount}%"></span>
			</div>
		{/each}
		<div class="entry total" style:--i={ledgerRows.length}>
			<span style:width="24%"></span>
			<span class="amount" style:width="22%"></span>
		</div>
	</div>
{:else if kind === 'sync'}
	<div class="sync">
		<div class="node white"></div>
		<div class="wire"><span class="continuous"></span></div>
		<div class="node hub"></div>
		<div class="wire"><span class="continuous late"></span></div>
		<div class="node peach"></div>
	</div>
{:else}
	<div class="agent">
		<div class="ask"></div>
		<div class="approval">
			<span style:width="70%"></span>
			<span style:width="48%"></span>
			<div class="choices"><span class="approve"></span><span class="decline"></span></div>
		</div>
	</div>
{/if}

<style>
	.shadow {
		background: var(--raised);
		box-shadow: 0 30px 60px -36px rgba(20, 22, 26, 0.4);
	}

	/* Monody: an app shell */
	.app {
		display: flex;
		gap: 12px;
		width: 76%;
		height: 230px;
		padding: 14px;
		border-radius: 16px;
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 70px;
		padding: 12px;
		border-radius: 12px;
		background: var(--surface);
	}

	.sidebar span {
		height: 8px;
		border-radius: 4px;
		background: var(--ring);
	}

	.sidebar .dark {
		height: 10px;
		border-radius: 5px;
		background: var(--ink-fill);
	}

	.panels {
		display: grid;
		flex-grow: 1;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 10px;
	}

	.panels div {
		border-radius: 12px;
		background: var(--surface);
	}

	.panels .peach {
		background: var(--peach);
		color: var(--on-peach);
	}

	.panels .span {
		grid-column: span 2;
	}

	/* Landing page: a short booking form */
	.landing {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 44%;
		padding: 20px;
		border-radius: 20px;
	}

	.landing .heading {
		width: 64%;
		height: 12px;
		border-radius: 6px;
		background: var(--ink-fill);
	}

	.landing .sub {
		width: 44%;
		height: 8px;
		margin-bottom: 6px;
		border-radius: 4px;
		background: var(--ring);
	}

	.field {
		height: 34px;
		border-radius: 10px;
		background: var(--surface);
	}

	.landing .cta {
		height: 36px;
		margin-top: 4px;
		border-radius: 999px;
		background: var(--ink-fill);
	}

	.pager {
		display: flex;
		justify-content: center;
		gap: 6px;
		margin-top: 4px;
	}

	.pager span {
		width: 6px;
		height: 6px;
		border-radius: 3px;
		background: var(--ring);
	}

	.pager .on {
		width: 18px;
		background: var(--ink-fill);
	}

	/* Reporting app: a bar chart. The bars grow when the card is hovered (see Projects.svelte). */
	.bars {
		display: flex;
		align-items: flex-end;
		gap: 14px;
		width: 70%;
		height: 200px;
	}

	.bar {
		flex-grow: 1;
		border-radius: 10px 10px 0 0;
		background: var(--ring);
		transform-origin: bottom;
	}

	.bar.dark {
		background: var(--ink-fill);
	}

	.bar.peach {
		background: var(--peach);
		color: var(--on-peach);
	}

	/* Online joining: a phone-sized join step */
	.join {
		display: flex;
		flex-direction: column;
		gap: 12px;
		width: 170px;
		height: 280px;
		padding: 20px 16px;
		border-radius: 28px;
	}

	.progress {
		display: flex;
		gap: 6px;
	}

	.progress span {
		flex-grow: 1;
		height: 5px;
		border-radius: 3px;
		background: var(--ring);
	}

	.progress .on {
		background: var(--ink-fill);
	}

	.join .heading {
		width: 70%;
		height: 14px;
		margin-top: 6px;
		border-radius: 6px;
		background: var(--ink-fill);
	}

	.option {
		height: 56px;
		border-radius: 14px;
		background: var(--surface);
	}

	.option.chosen {
		border: 2px solid var(--ink-fill);
		background: var(--peach);
		color: var(--on-peach);
	}

	.spacer {
		flex-grow: 1;
	}

	.join .cta {
		height: 40px;
		border-radius: 999px;
		background: var(--ink-fill);
	}

	/* Commission reporting: statement lines and a total */
	.ledger {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 72%;
	}

	.entry {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 44px;
		padding: 0 16px;
		border-radius: 14px;
		background: var(--raised);
	}

	.entry span {
		height: 9px;
		border-radius: 5px;
		background: var(--line-strong);
	}

	.entry .amount {
		background: var(--ink-fill);
	}

	.entry.total {
		background: var(--ink-fill);
	}

	.entry.total span {
		background: var(--faint);
	}

	.entry.total .amount {
		background: var(--peach);
		color: var(--on-peach);
	}

	/* Three systems, one truth: dots travelling between connected boxes */
	.sync {
		display: flex;
		align-items: center;
		width: 76%;
	}

	.node {
		flex: none;
		width: 68px;
		height: 68px;
		border-radius: 20px;
	}

	.node.white {
		background: var(--raised);
	}

	.node.peach {
		background: var(--peach);
		color: var(--on-peach);
	}

	.node.hub {
		width: 92px;
		height: 92px;
		border-radius: 28px;
		background: var(--ink-fill);
	}

	.wire {
		position: relative;
		flex: 1 1 0;
		height: 2px;
		background: var(--line-strong);
	}

	.wire span {
		position: absolute;
		top: -5px;
		width: 12px;
		height: 12px;
		margin-left: -6px;
		border-radius: 50%;
		background: var(--ink-fill);
		animation: travel 2s linear infinite;
	}

	.wire span.late {
		animation-delay: 1s;
	}

	@media (prefers-reduced-motion: reduce) {
		.wire span {
			left: 50%;
		}
	}

	/* Mai: a request and an approval card */
	.agent {
		display: flex;
		flex-direction: column;
		gap: 12px;
		width: 68%;
	}

	.ask {
		align-self: flex-end;
		width: 62%;
		height: 40px;
		border-radius: 20px 20px 6px 20px;
		background: var(--ink-fill);
	}

	.approval {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 86%;
		padding: 16px;
		border-radius: 20px 20px 20px 6px;
		background: var(--raised);
	}

	.approval > span {
		height: 9px;
		border-radius: 5px;
		background: var(--line-strong);
	}

	.choices {
		display: flex;
		gap: 8px;
		margin-top: 4px;
	}

	.choices span {
		height: 30px;
		border-radius: 999px;
	}

	.approve {
		width: 86px;
		background: var(--ink-fill);
	}

	.decline {
		width: 66px;
		background: var(--peach);
		color: var(--on-peach);
	}

	/*
	 * The loops. Each picture has one quiet movement that says what the project does.
	 * With reduced motion they all stop and the pictures rest in their drawn state.
	 */

	/* Monody: the highlighted menu item steps down the sidebar. */
	.sidebar span {
		animation: menu-step 8s ease infinite;
	}

	.sidebar span:nth-child(2) {
		animation-delay: 2s;
	}

	.sidebar span:nth-child(3) {
		animation-delay: 4s;
	}

	.sidebar span:nth-child(4) {
		animation-delay: 6s;
	}

	@keyframes menu-step {
		0%,
		30%,
		100% {
			background: var(--ring);
		}
		5%,
		25% {
			background: var(--ink-fill);
		}
	}

	/* Landing page: the three-step form moves through its steps. */
	.pager span {
		animation: form-step 6s ease infinite;
	}

	.pager span:nth-child(2) {
		animation-delay: 2s;
	}

	.pager span:nth-child(3) {
		animation-delay: 4s;
	}

	@keyframes form-step {
		0%,
		38%,
		100% {
			width: 6px;
			background: var(--ring);
		}
		5%,
		33% {
			width: 18px;
			background: var(--ink-fill);
		}
	}

	/* Reporting app: the bars breathe, each a little out of step with the next. */
	.bar {
		animation: bar-breathe 3.4s ease-in-out infinite alternate;
		animation-delay: calc(var(--i) * -0.55s);
	}

	@keyframes bar-breathe {
		from {
			transform: scaleY(0.72);
		}
		to {
			transform: scaleY(1);
		}
	}

	/* Online joining: the choice moves between the two options. */
	.option {
		border: 2px solid transparent;
		animation: choose 6s ease infinite;
	}

	.option.chosen {
		animation-delay: -3s;
	}

	@keyframes choose {
		0%,
		45%,
		100% {
			border-color: transparent;
			background: var(--surface);
		}
		50%,
		95% {
			border-color: var(--ink-fill);
			background: var(--peach);
		}
	}

	/* Commission reporting: the statement is worked through line by line, down to the total. */
	.entry .amount {
		animation: tally 5s ease-in-out infinite;
		animation-delay: calc(var(--i) * 0.5s);
	}

	@keyframes tally {
		0%,
		100% {
			opacity: 0.3;
		}
		15%,
		55% {
			opacity: 1;
		}
	}

	/* Mai: the approval card waits, and the approve button is pressed. */
	.approval {
		animation: float 5s ease-in-out infinite alternate;
	}

	.approve {
		animation: press 4.5s ease-in-out infinite;
	}

	@keyframes float {
		from {
			transform: translateY(3px);
		}
		to {
			transform: translateY(-3px);
		}
	}

	@keyframes press {
		0%,
		62%,
		100% {
			transform: scale(1);
		}
		70% {
			transform: scale(0.9);
		}
		80% {
			transform: scale(1.05);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.sidebar span,
		.pager span,
		.bar,
		.option,
		.entry .amount,
		.approval,
		.approve {
			animation: none;
		}
	}
</style>
