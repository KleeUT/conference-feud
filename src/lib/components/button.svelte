<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	let { children, ...props }: HTMLButtonAttributes = $props();
</script>

<button {...props}>
	{@render children?.()}
</button>

<style>
	button {
		width: 100%;
		padding: 1rem;
		border: 2px solid yellowgreen;
		background: hsla(245, 98%, 50%, 1);
		border: 0;
		box-shadow: 0.2rem 0.2rem 0.2rem black;
		color: white;
		cursor: pointer;
	}
</style>
