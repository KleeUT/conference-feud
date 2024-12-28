<script lang="ts">
	import Answer from './answer.svelte';

	interface Props {
		answers: Array<{ text: string; index: number; visible: boolean }>;
	}
	let { answers } = $props();
</script>

<div class="board">
	{#each answers as answer}
		<Answer number={answer.index} text={answer.text} visible={answer.visible} />
	{/each}
</div>

<style>
	.board {
		display: grid;
		grid-template-rows: 1fr 1fr 1fr 1fr;
		grid-template-columns: 1fr 1fr;
		grid-auto-flow: column;
		gap: 1rem;
		padding: 4rem;
		border: 0.2rem solid yellow;
		border-radius: 1rem;
		background: darkblue;
	}
</style>
