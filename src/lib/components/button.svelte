<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	let { children, disabled, ...props }: HTMLButtonAttributes = $props();
</script>

<button disabled class={disabled ? 'disabled' : ''} {...props}>
	{@render children?.()}
</button>

<style>
	button {
		width: 100%;

		border: 2px solid yellowgreen;
		background: hsla(245, 98%, 50%, 1);
		border: 0;
		box-shadow: 0.2rem 0.2rem 0.2rem black;
		color: white;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 2rem;
	}
	button.disabled {
		box-shadow: none;
		background-color: gray;
		border-radius: 0.2rem;
		border: 2px solid black;
	}
</style>
