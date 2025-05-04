<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	interface Props {
		type?: 'primary' | 'secondary';
	}
	let { children, href, type, ...props }: HTMLAnchorAttributes & Props = $props();
</script>

<a {href} class={type ?? ''} {...props}>
	{@render children?.()}
</a>

<style>
	a {
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
	.secondary {
		background: var(--color-ternary);
	}
</style>
