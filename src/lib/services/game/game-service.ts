import { newUUID } from '$lib/utils/uuid';
import type { D1GameStateRepository } from './d1-game-repository';
import type { NewAnswer, StoredAnswer, StoredGameState, StoredRound } from './types';

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
				.sort((x, y) => x.value - y.value)
				.map((answer) => ({
					id: newUUID(),
					answer: answer.answer || '',
					value: answer.value || 0,
					isVisible: false
				}))
		};

		await this.gameStateRepository.createRound(round);
	}

	async updateRound(
		roundId: string,
		question: string,
		answers: Array<StoredAnswer>
	): Promise<void> {
		const round: StoredRound = {
			id: roundId,
			question: question,
			playingTeam: null,
			isCurrent: false,
			isComplete: false,
			playOrder: 0,
			winningTeam: null,
			wrongGuesses: 0,
			answers: answers
				.sort((x, y) => x.value - y.value)
				.map((answer) => ({
					id: newUUID(),
					answer: answer.answer,
					value: answer.value,
					isVisible: false
				}))
		};

		await this.gameStateRepository.updateRound(round);
	}

	async getRounds(): Promise<Array<StoredRound>> {
		const rounds = await this.gameStateRepository.getRounds();
		return rounds;
	}

	async getRound(roundId: string): Promise<StoredRound | null> {
		const round = await this.gameStateRepository.getRound(roundId);
		return round;
	}

	async setTeamNames(team1Name: string, team2Name: string): Promise<void> {
		await this.gameStateRepository.setTeamNames(team1Name, team2Name);
	}

	async getGameState(): Promise<StoredGameState> {
		const gameState = await this.gameStateRepository.getGameState();
		return gameState;
	}
}
