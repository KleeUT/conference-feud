<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	interface Props {
		id: string;
	}
	let { children, id }: Props & SvelteHTMLElements['div'] = $props();
</script>

<div popover={'auto'} {id} class="popover">
	<div class="popover__main">
		<button popovertarget={id} popovertargetaction={'hide'}>X</button>
		{@render children?.()}
	</div>
</div>

<style>
	div.popover__main {
		/* height: 100vh;
		width: 100vw; */
		/* position: absolute; */
		display: flex;
		justify-content: center;
		align-content: center;
		width: 100%;
		margin: auto;
	}

	div.popover {
		box-shadow: 0 0 10rem black;
		background: transparent;
		border: none;
		padding: 0;
		width: 79%;
		margin: auto;
	}

	::backdrop {
		background-color: rgba(25, 25, 25, 0.5);
		height: 100vh;
		width: 100vw;
	}
	button {
		background-color: black;
		border: 0;
		color: white;
		padding: 0.5rem;
		cursor: pointer;
	}
</style>
