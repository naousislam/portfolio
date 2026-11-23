<script lang="ts">
	import type { Headline } from '#lib/content/types.ts';

	/** Renders a headline's text with its last words in the italic serif accent. */
	let { headline }: { headline: Headline } = $props();
</script>

{headline.lead} <span class="accent">{headline.accent}</span>
