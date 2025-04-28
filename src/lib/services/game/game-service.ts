import { newUUID } from '$lib/utils/uuid';
import type { D1GameStateRepository } from './d1-game-repository';
import type { NewAnswer, StoredRound } from './types';

export class GameService {
	constructor(private readonly gameStateRepository: D1GameStateRepository) {}

	async createRound(question: string, answers: Array<NewAnswer>): Promise<void> {
		const round: StoredRound = {
			id: newUUID(),
			question: question,
			playingTeam: null,
			isCurrent: false,
			isComplete: false,
			playOrder: 0,
			winningTeam: null,
			wrongGuesses: 0,
			answers: answers
				.filter((x) => !x.answer)
				.sort((x, y) => x.value - y.value)
				.map((answer) => ({
					id: newUUID(),
					answer: answer.answer,
					value: answer.value,
					isVisible: false
				}))
		};

		await this.gameStateRepository.createRound(round);
	}
}
