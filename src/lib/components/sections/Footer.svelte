<script lang="ts">
	import { footer } from '#lib/content/site.ts';
</script>

<footer>
	<div class="container inner">
		<span>{footer.location}</span>
		<span>{footer.credit}</span>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--line);
	}

	.inner {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 8px 24px;
		padding-top: 32px;
		/* Leaves room for the floating bar at the bottom of the screen. */
		padding-bottom: 104px;
		font-size: 16px;
		color: var(--muted);
	}

	/* Leave room for the section nav pinned to the bottom of a phone screen. */
	@media (max-width: 860px) {
		.inner {
			padding-bottom: 96px;
		}
	}
</style>
