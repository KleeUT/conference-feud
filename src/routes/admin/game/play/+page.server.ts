import { error } from '@sveltejs/kit';
import { setup } from '../../../context';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const { gameService } = setup(platform);
	const game = await gameService.getGameState();
	if (!game) {
		return error(404, 'Game not found');
	}
	const currentRound = game.rounds.find((round) => round.playOrder === game.currentRound);
	if (!currentRound) {
		return error(500, 'Current round not found');
	}
	let currentRoundAnswers = currentRound?.answers ?? [];
	const wrongGuesses = Array(currentRound?.wrongGuesses);
	currentRoundAnswers = currentRoundAnswers
		.filter((x) => x.answer)
		.sort((x, y) => y.value - x.value);
	const hasGuessesRemaining = currentRound?.wrongGuesses < 4;
	const canEndRound = currentRoundAnswers.every((x) => x.isVisible) || !hasGuessesRemaining;
	const roundEnded = !!currentRound?.isComplete;
	console.log('team', currentRound?.playingTeam);
	const teams = {
		team1: game.team1Name,
		team2: game.team2Name
	} as { [k: string]: string };
	const scores = game.rounds.reduce(
		(acc, round) => {
			if (!round.isComplete) return acc;
			const roundScore = round.answers.reduce(
				(acc, answer) => acc + (answer.isVisible ? answer.value : 0),
				0
			);
			if (round.winningTeam === 'team1') {
				acc.team1.score += roundScore;
			} else if (round.winningTeam === 'team2') {
				acc.team2.score += roundScore;
			}
			return acc;
		},
		{
			team1: { name: game.team1Name, score: 0 },
			team2: { name: game.team2Name, score: 0 }
		}
	);
	return {
		game,
		currentRoundAnswers,
		wrongGuesses,
		hasGuessesRemaining,
		canEndRound,
		roundEnded,
		teams,
		scores
	};
};

export const actions: Actions = {
	answer: async (event) => {
		const { gameService } = setup(event.platform);
		const formData = await event.request.formData();
		const answerId = formData.get('answerId') as string;
		await gameService.setAnswerVisible(answerId);
	},
	wrongGuess: async (event) => {
		const { gameService } = setup(event.platform);
		await gameService.addWrongGuess();
	},
	setTeam1: async (event) => {
		const { gameService } = setup(event.platform);
		await gameService.setPlayingTeam('team1');
	},
	setTeam2: async (event) => {
		const { gameService } = setup(event.platform);
		await gameService.setPlayingTeam('team2');
	},
	switchTeam: async (event) => {
		const { gameService } = setup(event.platform);
		await gameService.switchTeam();
	},
	endRound: async (event) => {
		const { gameService } = setup(event.platform);
		await gameService.endRound();
	},
	nextRound: async (event) => {
		const { gameService } = setup(event.platform);
		await gameService.nextRound();
	}
};
