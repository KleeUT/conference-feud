<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Main from '$lib/components/main.svelte';

	const { data } = $props();
	const currentRound = data.game.rounds.find((round) => round.playOrder === data.game.currentRound);
</script>

<Main>
	<div class="game">
		<table>
			<thead>
				<tr>
					<th>Round</th>
					<th>Team</th>
					<th>Score</th>
					<th>Complete</th>
				</tr>
			</thead>
			<tbody>
				{#each data.game.rounds as round}
					<tr>
						<td>{round.playOrder}</td>
						<td
							>{data.teams[round.winningTeam || ''] ||
								data.teams[round.playingTeam || ''] ||
								' - '}</td
						>
						<td>{round.answers.reduce((p, c) => (c.isVisible ? p + c.value : p), 0)}</td>
						<td>{round.isComplete ? '✅' : ''}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<div><p></p></div>
		<h2>Current Round {currentRound?.playOrder}</h2>
		<h3>{currentRound?.question}</h3>
		{#if currentRound?.playingTeam}
			<div class="player_buttons">
				<h3>Current Team: {data.teams[currentRound?.playingTeam]}</h3>
				<form method="POST" action="/admin/game/play?/switchTeam">
					<Button disabled={data.roundEnded} type="submit">Switch</Button>
				</form>
			</div>
		{:else}
			<div class="player_buttons">
				<form method="POST" action="/admin/game/play?/setTeam1">
					<Button type="submit">{data.game.team1Name}</Button>
				</form>
				<form method="POST" action="/admin/game/play?/setTeam2">
					<Button type="submit">{data.game.team2Name}</Button>
				</form>
			</div>
		{/if}
		<!-- Looking to do multiple sumbit buttons so expose the answer, maybe using javascript or possibly using query params -->
		<div class="currenRoundAnswers">
			{#each data.currentRoundAnswers as answer}
				<div class="answer-display">
					<p>{answer.answer}</p>
					<p class="value">{answer.value}</p>
				</div>
				{#if answer.isVisible}
					<div></div>
				{:else}
					<form method="POST" action="/admin/game/play?/answer">
						<input type="hidden" name="answerId" value={answer.id} />
						<Button disabled={data.roundEnded} type="submit"
							>{answer.isVisible ? 'Visible' : 'Show'}</Button
						>
					</form>
				{/if}
			{/each}
		</div>
		<form method="POST" action="/admin/game/play?/wrongGuess">
			<div class="wrongGuesses">
				{#if data.hasGuessesRemaining && !data.canEndRound && !data.roundEnded}
					<Button>X</Button>
				{/if}
				{#each data.wrongGuesses}
					<div>[X]</div>
				{/each}
			</div>
		</form>
		{#if data.roundEnded}
			<form method="POST" action="/admin/game/play?/nextRound">
				<Button type="submit">Next Round</Button>
			</form>
		{:else}
			<form method="POST" action="/admin/game/play?/endRound">
				<Button disabled={!data.canEndRound} type="submit">End Round</Button>
			</form>
		{/if}
	</div>
</Main>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		padding: 8px;
		text-align: left;
		border-bottom: 1px solid #ddd;
	}
	.currenRoundAnswers {
		display: grid;
		grid-template-columns: 9fr 1fr;
		gap: 1rem;
	}
	.currenRoundAnswers div {
		border: 2px solid white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.wrongGuesses {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.wrongGuesses div {
		border: 2px solid red;
		padding: 1rem;
	}
	.player_buttons {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}
	div.game {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}
	div.answer-display {
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	div.answer-display p.value {
		color: grey;
	}
</style>
