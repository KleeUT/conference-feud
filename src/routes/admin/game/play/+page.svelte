<script lang="ts">
	import Button from '$lib/components/button.svelte';

	const { data } = $props();
	const currentRound = data.game.rounds.find((round) => round.playOrder === data.game.currentRound);
	const answers = currentRound?.answers || [];
</script>

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
				<td>{round.playingTeam || ' - '}</td>
				<td>{round.answers.reduce((p, c) => (c.isVisible ? p + c.value : p), 0)}</td>
				<td>{round.isComplete ? '✅' : ''}</td>
			</tr>
		{/each}
	</tbody>
</table>
<hr />
<h2>Current Round {currentRound?.playOrder}</h2>
<h3>{currentRound?.question}</h3>
{#each answers as answer}
	<div>
		<form method="POST" action="/admin/game/play/?answer">
			{answer.answer}
			<input type="hidden" name="answerId" value={answer.id} />
			<Button type="submit">{answer.isVisible ? 'Show' : 'Visible'}</Button>
		</form>
	</div>
{/each}

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
</style>
