<script lang="ts">
	import type { StoredRound, StoredGameState } from '$lib/services/game/types';
	import Answer from './answer.svelte';

	interface Props {
		round: StoredRound;
	}
	let { round }: Props = $props();
	const answers = $derived(round.answers.filter((x) => x.value).sort((a, b) => b.value - a.value));
	const wrongGuesses = $derived(new Array(round.wrongGuesses));
</script>

<div class="board">
	{#each answers as answer}
		<Answer {answer} />
	{/each}
</div>
<div class="wrong-guesses">
	{#each wrongGuesses}
		<p>[x]</p>
	{/each}
</div>

<style>
	.board {
		display: grid;
		grid-template-rows: 1fr 1fr 1fr 1fr;
		grid-template-columns: 1fr 1fr;
		grid-auto-flow: column;
		gap: 1rem;
	}
	.wrong-guesses {
		margin-top: 1rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}
	.wrong-guesses p {
		color: red;
		font-size: 3rem;
		padding: 0.5rem;
		vertical-align: middle;
	}
</style>
