<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import type { Step } from '#lib/content/types.ts';

	/** The small looping scene shown beside the active "How I work" step. Decorative only. */
	let { step }: { step: Step['id'] } = $props();

	const proposalRows = ["What I'll build", 'How long it takes', 'What it costs'];
	const codeLines = [
		{ width: '42%', indent: 0, tone: 'bright' },
		{ width: '64%', indent: 24, tone: 'dim' },
		{ width: '48%', indent: 24, tone: 'dim' },
		{ width: '36%', indent: 48, tone: 'peach' },
		{ width: '56%', indent: 24, tone: 'dim' },
		{ width: '22%', indent: 0, tone: 'bright' }
	];
</script>

<div class="scene" aria-hidden="true">
	{#if step === 'understand'}
		<div class="chat">
			<div class="bubble them" style:--delay="0s">Where does the day slow down?</div>
			<div class="bubble me" style:--delay="0.5s">Month-end. Three people, two days.</div>
			<div class="bubble them" style:--delay="1s">Show me how it's done today.</div>
			<div class="pill found" style:--delay="1.6s">Problem found</div>
		</div>
	{:else if step === 'propose'}
		<div class="proposal">
			<div class="kicker" style:--delay="0s">Proposal</div>
			<div class="title" style:--delay="0.15s">Month-end, in minutes</div>
			{#each proposalRows as row, index (row)}
				<div class="row" style:--delay="{0.45 + index * 0.35}s">
					<span>{row}</span>
					<span class="tick"><Check size={13} strokeWidth={3.2} /></span>
				</div>
			{/each}
			<div class="pill" style:--delay="1.7s">Agreed</div>
		</div>
	{:else if step === 'design'}
		<div class="wireframe">
			<div class="dots"><span></span><span></span><span></span></div>
			<div class="block heading" style:--delay="0s"></div>
			<div class="thirds">
				<div class="block peach" style:--delay="0.15s"></div>
				<div class="block" style:--delay="0.3s"></div>
				<div class="block" style:--delay="0.45s"></div>
			</div>
			<div class="block wide" style:--delay="0.6s"></div>
		</div>
	{:else if step === 'build'}
		<div class="editor">
			{#each codeLines as line, index (index)}
				<div
					class={['line', line.tone]}
					style:--width={line.width}
					style:--delay="{index * 0.25}s"
					style:margin-left="{line.indent}px"
				></div>
			{/each}
			<div class="live" style:--delay="1.6s"><span></span>Live</div>
		</div>
	{:else}
		<div class="flow">
			<div class="node small white" style:--delay="0s"></div>
			<div class="wire"><span class="continuous"></span></div>
			<div class="node big continuous" style:--delay="0.15s"><div class="check"></div></div>
			<div class="wire"><span class="continuous late"></span></div>
			<div class="node small peach" style:--delay="0.3s"></div>
		</div>
	{/if}
</div>

<style>
	.scene {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
	}

	/* Everything that appears in sequence pops in after its own --delay. */
	.bubble,
	.pill,
	.kicker,
	.title,
	.row,
	.block,
	.live,
	.node {
		animation: pop 0.5s ease var(--delay, 0s) both;
	}

	.pill {
		display: inline-flex;
		padding: 10px 18px;
		border-radius: 999px;
		background: var(--peach);
		color: var(--on-peach);
		font-size: 15.5px;
	}

	/* 01 Understand */
	.chat {
		display: flex;
		flex-direction: column;
		gap: 14px;
		width: 76%;
	}

	.bubble {
		padding: 14px 20px;
	}

	.them {
		align-self: flex-start;
		border-radius: 22px 22px 22px 6px;
		background: var(--raised);
		box-shadow: 0 20px 40px -26px rgba(20, 22, 26, 0.35);
	}

	.me {
		align-self: flex-end;
		border-radius: 22px 22px 6px 22px;
		background: var(--ink-fill);
		color: var(--on-fill);
	}

	.found {
		align-self: center;
		margin-top: 8px;
	}

	/* 02 Propose */
	.proposal {
		width: 64%;
		padding: 28px;
		border-radius: 22px;
		background: var(--raised);
		box-shadow: 0 30px 60px -34px rgba(20, 22, 26, 0.35);
	}

	.kicker {
		font-size: 15.5px;
		color: var(--muted);
	}

	.title {
		margin: 6px 0 18px;
		font-size: 24px;
		letter-spacing: -0.03em;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 16px 0;
		border-top: 1px solid var(--line);
		font-size: 17px;
	}

	.row span:first-child {
		flex: 1 1 0;
	}

	.tick {
		display: grid;
		place-items: center;
		flex: none;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background: var(--ink-fill);
		color: var(--on-fill);
	}

	.proposal .pill {
		margin-top: 18px;
	}

	/* 03 Design */
	.wireframe {
		width: 78%;
		padding: 16px;
		border-radius: 18px;
		background: var(--raised);
		box-shadow: 0 30px 60px -34px rgba(20, 22, 26, 0.35);
	}

	.dots {
		display: flex;
		gap: 6px;
		margin-bottom: 14px;
	}

	.dots span {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: var(--ring);
	}

	.block {
		height: 92px;
		border-radius: 16px;
		background: var(--surface);
		animation-duration: 0.6s;
	}

	.block.heading {
		width: 46%;
		height: 26px;
		border-radius: 9px;
		background: var(--ink-fill);
	}

	.block.peach {
		background: var(--peach);
		color: var(--on-peach);
	}

	.block.wide {
		height: 110px;
		margin-top: 12px;
	}

	.thirds {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 12px;
		margin-top: 14px;
	}

	/* 04 Build */
	.editor {
		display: flex;
		flex-direction: column;
		gap: 14px;
		width: 78%;
		padding: 24px;
		border-radius: 18px;
		background: var(--ink-fill);
		box-shadow: 0 30px 60px -30px rgba(20, 22, 26, 0.5);
	}

	.line {
		height: 10px;
		border-radius: 5px;
		background: var(--muted-soft);
		animation: type 0.5s ease var(--delay) both;
	}

	.line.bright {
		background: var(--card);
	}

	.line.peach {
		background: var(--peach);
		color: var(--on-peach);
	}

	@keyframes type {
		from {
			width: 0;
		}
		to {
			width: var(--width);
		}
	}

	.live {
		display: flex;
		align-items: center;
		align-self: flex-start;
		gap: 8px;
		height: 34px;
		margin-top: 10px;
		padding: 0 16px;
		border-radius: 999px;
		background: var(--card);
		color: var(--ink-fill);
		font-size: 14px;
	}

	.live span {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--ink-fill);
	}

	/* 05 Automate */
	.flow {
		display: flex;
		align-items: center;
		width: 80%;
	}

	.node {
		flex: none;
	}

	.node.small {
		width: 84px;
		height: 84px;
		border-radius: 24px;
		box-shadow: 0 20px 40px -24px rgba(20, 22, 26, 0.35);
	}

	.node.white {
		background: var(--raised);
	}

	.node.peach {
		background: var(--peach);
		color: var(--on-peach);
	}

	.node.big {
		display: grid;
		place-items: center;
		width: 112px;
		height: 112px;
		border-radius: 32px;
		background: var(--ink-fill);
		animation:
			pop 0.5s ease 0.15s both,
			ping 1.8s ease-out 1s infinite;
	}

	@keyframes ping {
		0% {
			box-shadow: 0 0 0 0 rgba(31, 32, 35, 0.35);
		}
		100% {
			box-shadow: 0 0 0 18px rgba(31, 32, 35, 0);
		}
	}

	.check {
		width: 34px;
		height: 17px;
		border-bottom: 4px solid var(--on-fill);
		border-left: 4px solid var(--on-fill);
		transform: rotate(-45deg) translate(2px, -5px);
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
		animation: travel 1.8s linear infinite;
	}

	.wire span.late {
		animation-delay: 0.9s;
	}

	@media (prefers-reduced-motion: reduce) {
		/* Keep the pop-in, drop the endless pulse. */
		.node.big {
			animation: pop 0.5s ease 0.15s both;
		}

		.wire span {
			left: 50%;
		}
	}
</style>
