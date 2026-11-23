<script lang="ts">
	import type { Snippet } from 'svelte';
	import X from '@lucide/svelte/icons/x';
	import RoundButton from './RoundButton.svelte';

	interface Props {
		open: boolean;
		/** Accessible name for the dialog. */
		label: string;
		children: Snippet;
	}

	let { open = $bindable(false), label, children }: Props = $props();

	let dialog: HTMLDialogElement;

	// The native <dialog> gives us the focus trap, Escape to close and the top layer.
	$effect(() => {
		if (open && !dialog.open) dialog.showModal();
		else if (!open && dialog.open) dialog.close();
	});

	function closeOnScrim(event: MouseEvent) {
		if (event.target === dialog) open = false;
	}
</script>

<dialog bind:this={dialog} aria-label={label} onclose={() => (open = false)} onclick={closeOnScrim}>
	<div class="sheet">
		<RoundButton label="Close" class="modal-close" onclick={() => (open = false)}>
			<X size={18} aria-hidden="true" />
		</RoundButton>
		{@render children()}
	</div>
</dialog>

<style>
	dialog {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		max-width: none;
		max-height: none;
		margin: 0;
		padding: 24px;
		border: 0;
		background: transparent;
		color: inherit;
		outline: none;
		opacity: 0;
		transition:
			opacity 0.45s var(--ease),
			overlay 0.45s allow-discrete,
			display 0.45s allow-discrete;
	}

	dialog[open] {
		display: grid;
		place-items: center;
		opacity: 1;
	}

	dialog::backdrop {
		background: rgba(27, 28, 31, 0);
		backdrop-filter: blur(0);
		transition:
			background 0.45s var(--ease),
			backdrop-filter 0.45s var(--ease),
			overlay 0.45s allow-discrete,
			display 0.45s allow-discrete;
	}

	dialog[open]::backdrop {
		background: rgba(27, 28, 31, 0.38);
		backdrop-filter: blur(6px);
	}

	.sheet {
		position: relative;
		width: min(640px, 100%);
		max-height: 100%;
		overflow: auto;
		/* The sheet still scrolls; a bar inside its rounded corner only gets in the way. */
		scrollbar-width: none;
		padding: clamp(24px, 4vw, 48px);
		border-radius: 32px;
		background: var(--card);
		box-shadow: 0 40px 90px -40px rgba(20, 22, 26, 0.5);
		transform: translateY(28px) scale(0.97);
		transition: transform 0.55s var(--ease);
	}

	dialog[open] .sheet {
		transform: none;
	}

	@starting-style {
		dialog[open] {
			opacity: 0;
		}

		dialog[open]::backdrop {
			background: rgba(27, 28, 31, 0);
			backdrop-filter: blur(0);
		}

		dialog[open] .sheet {
			transform: translateY(28px) scale(0.97);
		}
	}

	/* Blurring the whole page behind the sheet is costly on a phone. A plain dim does the job. */
	@media (max-width: 860px) {
		dialog::backdrop,
		dialog[open]::backdrop {
			backdrop-filter: none;
		}

		dialog[open]::backdrop {
			background: rgba(27, 28, 31, 0.55);
		}
	}

	.sheet :global(.modal-close) {
		position: absolute;
		top: clamp(16px, 3vw, 32px);
		right: clamp(16px, 3vw, 32px);
	}
</style>
