<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	interface Props {
		level: '1' | '2' | '3' | '4' | '5';
		size?: '1' | '2' | '3' | '4' | '5' | undefined;
	}
	let { children, level, size = undefined, ...props }: Props & SvelteHTMLElements['h1'] = $props();
</script>

{#if level === '1'}
	<h1 class="size{size}">{@render children?.()}</h1>
{:else if level === '2'}
	<h2 class="size{size}">{@render children?.()}</h2>
{:else if level === '3'}
	<h3 class="size{size}">{@render children?.()}</h3>
{:else if level === '4'}
	<h4 class="size{size}">{@render children?.()}</h4>
{:else if level === '5'}
	<h5 class="size{size}">{@render children?.()}</h5>
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
	.size1 {
		font-size: 2rem;
	}
	.size2 {
		font-size: 1.75rem;
	}
	.size3 {
		font-size: 1.5rem;
	}
	.size4 {
		font-size: 1.2rem;
	}
	.size5 {
		font-size: 1rem;
	}
</style>
