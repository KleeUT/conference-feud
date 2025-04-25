<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	let { children, disabled, ...props }: HTMLButtonAttributes = $props();
</script>

<button class={disabled ? 'disabled' : ''} {...props}>
	{@render children?.()}
</button>

<style>
	button {
		width: 100%;
		background: linear-gradient(145deg, var(--color-secondary) 0%, var(--color-ternary) 100%);
		border-radius: 1rem;
		border: var(--color-highlight) solid 2px;
		text-decoration: none;
		padding: 1rem;
		display: block;
		margin: auto;
		text-align: center;
	}
	button.disabled {
		background: var(--color-ternary);
		border: 0;
	}
</style>
