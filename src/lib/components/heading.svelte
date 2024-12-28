<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	interface Props {
		level: '1' | '2' | '3' | '4' | '5';
	}
	let { children, level, ...props }: Props & SvelteHTMLElements['h1'] = $props();
</script>

{#if level === '1'}
	<h1>{@render children?.()}</h1>
{:else if level === '2'}
	<h2>{@render children?.()}</h2>
{:else if level === '3'}
	<h3>{@render children?.()}</h3>
{:else if level === '4'}
	<h4>{@render children?.()}</h4>
{:else if level === '5'}
	<h5>{@render children?.()}</h5>
{/if}

<style>
	h1 {
		font-size: 2rem;
	}

	h1,
	h2,
	h3,
	h4,
	h5 {
		text-align: center;
	}
</style>
