<script lang="ts">
	type Team = {
		name: string;
		score: number;
	};
	interface Props {
		team1: Team;
		team2: Team;
	}
	let { team1, team2 } = $props();
</script>

<div class="scoreboard">
	<div class="team team1">
		<p>{team1.name}</p>
		<p>{team1.score}</p>
	</div>
	<div class="divider"></div>
	<div class="team team2">
		<p>{team2.name}</p>
		<p>{team2.score}</p>
	</div>
</div>

<style>
	p {
		margin: 0;
	}
	.team {
		font-size: 2rem;
		display: flex;
		flex-direction: column;
	}
	.team1 {
		text-align: left;
	}
	.team2 {
		text-align: right;
	}
	.scoreboard {
		display: flex;
		justify-content: space-between;
		background: darkblue;
		padding: 1rem;
		outline: 0.2rem solid yellow;
		border-radius: 1rem;
	}
</style>
