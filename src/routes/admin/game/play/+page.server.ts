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
	currentRoundAnswers = currentRoundAnswers.filter((x) => x.answer);
	const hasGuessesRemaining = currentRound?.wrongGuesses < 3;
	const canEndRound = currentRoundAnswers.every((x) => x.isVisible) || !hasGuessesRemaining;
	return {
		game,
		currentRoundAnswers,
		wrongGuesses,
		hasGuessesRemaining,
		canEndRound
	};
};

export const actions: Actions = {
	answer: async (event) => {
		const { gameService } = setup(event.platform);
	},
	wrongGuess: async (event) => {
		const { gameService } = setup(event.platform);
		await gameService.addWrongGuess();
	},
	setTeam1: async (event) => {
		console.log('setTeam');
		const { gameService } = setup(event.platform);
	},
	setTeam2: async (event) => {
		console.log('setTeam');
		const { gameService } = setup(event.platform);
	}
};
