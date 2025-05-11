<script lang="ts">
	type Team = {
		name: string;
		score: number;
		playing: boolean;
	};
	interface Props {
		team1: Team;
		team2: Team;
		currentRound: {
			playingTeam: string;
			score: number;
		};
	}
	let { team1, team2, currentRound }: Props = $props();
</script>

<div class="scoreboard">
	<div class="team team1 {team1.playing ? 'activeTeam' : ''}">
		<p>{team1.name}</p>
		<p>{team1.score}</p>
	</div>
	<div class="currentRound">
		<p>{currentRound.score}</p>
	</div>
	<div class="team team2 {team2.playing ? 'activeTeam' : ''}">
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
		color: var(--color-secondary);
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
		border-radius: 0.1rem;
	}
	.currentRound p {
		text-align: center;
		font-size: 2rem;
	}
	.activeTeam {
		font-weight: bold;
		color: var(--color-primary);
	}
</style>
