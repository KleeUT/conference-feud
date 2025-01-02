<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface Props {
		value?: string;
		placeholder?: string;
		label?: string;
		maxLength?: number;
		hidden?: boolean;
	}
	let {
		value = '',
		label = '',
		hidden = false,
		maxLength,
		...props
	}: Props & HTMLInputAttributes = $props();
	if (value && maxLength && value.length > maxLength) {
		value = value.subString(0, maxLength);
	}
</script>

<label class={hidden ? 'hidden' : ''}>
	{label}
	<input type="text" bind:value {...props} max={maxLength} />
	{#if maxLength !== undefined}
		<p>{value.length}/{maxLength}</p>
	{/if}
</label>

<style>
	input {
		padding: 1rem;
		border-radius: 0.2rem;
		display: block;
		width: 100%;
	}
	p {
		text-align: right;
		font-size: 0.75rem;
	}
	.hidden {
		display: none;
	}
</style>
