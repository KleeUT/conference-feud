import type { OptionalTeamName, StoredGameState, StoredRound } from '$lib/services/game/types';

export function parse(str: string): StoredGameState {
	const gameState = JSON.parse(str) as { gameState: StoredGameState };
	return gameState.gameState;
}

export function teamScores(gameState: StoredGameState): {
	team1: number;
	team2: number;
	currentRound: number;
} {
	console.log('gameState - team scores', gameState);
	const scores = gameState.rounds.reduce(
		(acc, round) => {
			if (round.playOrder === gameState.currentRound) {
				acc.currentRound = round.answers.reduce(
					(acc, answer) => acc + (answer.isVisible ? answer.value : 0),
					0
				);
			}
			if (!round.isComplete) return acc;
			const roundScore = round.answers.reduce(
				(acc, answer) => acc + (answer.isVisible ? answer.value : 0),
				0
			);
			if (round.winningTeam === 'team1') {
				acc.team1 += roundScore;
			} else if (round.winningTeam === 'team2') {
				acc.team2 += roundScore;
			}
			return acc;
		},
		{ team1: 0, team2: 0, currentRound: 0 }
	);
	return scores;
}

export function findCurrentRound(gameState: StoredGameState): StoredRound {
	const round = gameState.rounds.find(
		(round) => round.playOrder === gameState.currentRound
	) as StoredRound;
	return round;
}

export function teamName(team: OptionalTeamName, gameState: StoredGameState): string {
	if (team === 'team1') {
		return gameState.team1Name;
	} else if (team === 'team2') {
		return gameState.team2Name;
	}
	return '';
}
