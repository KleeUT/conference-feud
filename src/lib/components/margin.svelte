<script lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';
	interface Props {
		marginTop?: '1';
	}
	const { children, marginTop }: HTMLBaseAttributes & Props = $props();
	const mt = marginTop ? `mt${marginTop}` : '';
</script>

<div class="mt1">
	{@render children?.()}
</div>

<style>
	.mt1 {
		margin-top: 1rem;
	}
</style>
