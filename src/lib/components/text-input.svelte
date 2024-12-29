<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface Props {
		value?: string;
		placeholder?: string;
		label?: string;
	}
	let { value, label = '', ...props }: Props & HTMLInputAttributes = $props();
</script>

<label>
	{label}
	<input type="text" bind:value {...props} />
</label>

<style>
	input {
		padding: 1rem;
		border-radius: 0.2rem;
		display: block;
		width: 100%;
	}
</style>
