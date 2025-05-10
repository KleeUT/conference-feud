<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	interface Props {
		buttonType?: 'primary' | 'secondary';
	}
	let { children, disabled, buttonType, ...props }: Props & HTMLButtonAttributes = $props();
</script>

<button class="{disabled ? 'disabled' : ''} {buttonType ?? ''}" {...props}>
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
		cursor: pointer;
	}
	button.disabled {
		background: var(--color-ternary);
		border: 0;
		cursor: not-allowed;
	}
	.secondary {
		background: var(--color-ternary);
	}
</style>
