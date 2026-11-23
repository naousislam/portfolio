<script lang="ts">
	import MapPin from '@lucide/svelte/icons/map-pin';
	import UserPen from '@lucide/svelte/icons/user-pen';
	import { footer } from '#lib/content/site.ts';
</script>

<footer>
	<div class="container inner">
		<span class="item">
			<MapPin size={16} strokeWidth={1.9} aria-hidden="true" />
			{footer.location}
		</span>
		<span class="item">
			<UserPen size={16} strokeWidth={1.9} aria-hidden="true" />
			{footer.credit}
		</span>
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

	.item {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	@media (max-width: 860px) {
		.inner {
			padding-bottom: 96px;
		}
	}
</style>
