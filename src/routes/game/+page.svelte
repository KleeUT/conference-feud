<script lang="ts">
	import { onMount } from 'svelte';
	import Board from './board.svelte';
	import ScoreBoard from '../score-board.svelte';
	import { findCurrentRound, parse, teamName, teamScores } from './game-parser';
	import Heading from '$lib/components/heading.svelte';

	const { data } = $props();
	let gameState = $state(data.game);
	let scores = $derived(teamScores(gameState));
	let currentRound = $derived(findCurrentRound(gameState));
	let team1Playing = $derived(currentRound.playingTeam === 'team1');
	let team2Playing = $derived(currentRound.playingTeam === 'team2');
	onMount(async () => {
		const res = await fetch('/event');
		if (!res.ok || !res.body) {
			console.log('http error' + res.body);
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
		while (true) {
			const { value, done } = await reader.read();
			if (done) break;
			console.log('received: ', value);
			gameState = parse(value);
		}
	});
</script>

<div class="main">
	<ScoreBoard
		team1={{ name: gameState.team1Name, score: scores.team1, playing: team1Playing }}
		team2={{ name: gameState.team2Name, score: scores.team2, playing: team2Playing }}
		currentRound={{
			playingTeam: teamName(currentRound.playingTeam, gameState),
			score: scores.currentRound
		}}
	></ScoreBoard>
	<div class="padding">
		<Heading size="3" level="1">{currentRound.question}</Heading>
	</div>
	<Board round={currentRound}></Board>
</div>

<style>
	.padding {
		padding: 1rem;
	}
	.main {
		padding: 1rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
