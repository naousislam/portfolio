<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '$app/forms';
	import { TURNSTILE_SITE_KEY } from '$app/env/public';
	import { contact } from '#lib/content/site.ts';
	import type { ContactResult } from '#lib/content/types.ts';
	import Button from '#lib/components/ui/Button.svelte';
	import { mountTurnstile, type TurnstileWidget } from '#lib/turnstile.ts';

	/** The action result when the page was reached by a plain form post (no JavaScript). */
	let { result = null }: { result?: ContactResult | null } = $props();

	let enhanced = $state<ContactResult | null>(null);
	let sending = $state(false);
	const outcome = $derived(enhanced ?? result);

	// Bot check: Cloudflare Turnstile draws itself in this box when a site key is set. It adds
	// its token to the form as a hidden field, and stays invisible unless it needs the person.
	let botCheckBox = $state<HTMLDivElement>();
	let botCheck: TurnstileWidget | null = null;

	$effect(() => {
		if (!TURNSTILE_SITE_KEY || !botCheckBox) return;
		botCheck = mountTurnstile(botCheckBox, TURNSTILE_SITE_KEY);
		return () => {
			botCheck?.remove();
			botCheck = null;
		};
	});

	// The action lives on /contact so the home page can stay static. Handle the result here
	// instead of navigating there.
	const submit: SubmitFunction = () => {
		sending = true;
		return ({ result: response, formElement }) => {
			sending = false;
			// A token is good for one send, so a failed send needs a fresh one.
			if (response.type !== 'success') botCheck?.reset();
			if (response.type === 'success') {
				enhanced = { success: true };
				formElement.reset();
			} else if (response.type === 'failure') {
				enhanced = response.data as ContactResult;
			} else {
				enhanced = { success: false, message: contact.failure };
			}
		};
	};
</script>

{#if outcome?.success}
	<p class="sent" role="status">{contact.success}</p>
{:else}
	<form method="POST" action="/contact" use:enhance={submit} novalidate>
		<div class="pair">
			<div class="field">
				<input
					id="contact-name"
					name="name"
					type="text"
					autocomplete="name"
					placeholder=" "
					required
					maxlength="120"
					value={outcome?.values?.name ?? ''}
					aria-invalid={outcome?.errors?.name ? 'true' : undefined}
					aria-describedby={outcome?.errors?.name ? 'contact-name-error' : undefined}
				/>
				<label for="contact-name">{contact.fields.name}</label>
				{#if outcome?.errors?.name}
					<p class="error" id="contact-name-error">{outcome.errors.name}</p>
				{/if}
			</div>
			<div class="field">
				<input
					id="contact-email"
					name="email"
					type="email"
					autocomplete="email"
					placeholder=" "
					required
					maxlength="254"
					value={outcome?.values?.email ?? ''}
					aria-invalid={outcome?.errors?.email ? 'true' : undefined}
					aria-describedby={outcome?.errors?.email ? 'contact-email-error' : undefined}
				/>
				<label for="contact-email">{contact.fields.email}</label>
				{#if outcome?.errors?.email}
					<p class="error" id="contact-email-error">{outcome.errors.email}</p>
				{/if}
			</div>
		</div>

		<div class="field">
			<textarea
				id="contact-message"
				name="message"
				rows="4"
				placeholder=" "
				required
				maxlength="5000"
				value={outcome?.values?.message ?? ''}
				aria-invalid={outcome?.errors?.message ? 'true' : undefined}
				aria-describedby={outcome?.errors?.message ? 'contact-message-error' : undefined}
			></textarea>
			<label for="contact-message">{contact.fields.message}</label>
			{#if outcome?.errors?.message}
				<p class="error" id="contact-message-error">{outcome.errors.message}</p>
			{/if}
		</div>

		<!-- Spam trap: people never see or reach this field, so anything in it is a bot. -->
		<div class="visually-hidden" aria-hidden="true">
			<label for="contact-company">Company</label>
			<input id="contact-company" name="company" type="text" tabindex="-1" autocomplete="off" />
		</div>

		{#if outcome?.message}
			<p class="error" role="alert">{outcome.message}</p>
		{/if}

		<div class="bot-check" bind:this={botCheckBox}></div>

		<div class="send">
			<Button type="submit" disabled={sending}>{contact.submit}</Button>
		</div>
		<p class="privacy">{contact.privacy}</p>
	</form>
{/if}

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.pair {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	.pair .field {
		flex: 1 1 170px;
	}

	.field {
		position: relative;
	}

	input,
	textarea {
		display: block;
		width: 100%;
		padding: 26px 18px 10px;
		border: 1px solid transparent;
		border-radius: 16px;
		background: var(--surface);
		transition:
			background 0.2s ease,
			border-color 0.2s ease;
	}

	textarea {
		resize: vertical;
	}

	input:hover,
	textarea:hover {
		background: var(--surface-hover);
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--ink-fill);
		background: var(--bg);
	}

	input[aria-invalid='true'],
	textarea[aria-invalid='true'] {
		border-color: var(--ink-fill);
	}

	/* Floating label: it rests in the field and lifts once there is focus or a value. */
	.field label {
		position: absolute;
		top: 19px;
		left: 19px;
		font-size: 16px;
		color: var(--muted-soft);
		pointer-events: none;
		transition:
			top 0.18s ease,
			font-size 0.18s ease;
	}

	.field :focus + label,
	.field :not(:placeholder-shown) + label {
		top: 9px;
		font-size: 12.5px;
	}

	.error {
		margin-top: 6px;
		font-size: 15px;
		color: var(--ink);
	}

	.error::before {
		content: '! ';
		font-weight: 600;
	}

	/* Takes no room unless Cloudflare decides to show its challenge. */
	.bot-check:empty {
		display: none;
	}

	.send {
		margin-top: 8px;
	}

	.privacy {
		margin-top: 4px;
		font-size: 14.5px;
		color: var(--muted);
	}

	.sent {
		padding: 24px;
		border-radius: 16px;
		background: var(--peach);
		color: var(--on-peach);
		animation: fade-up 0.6s var(--ease) both;
	}
</style>
