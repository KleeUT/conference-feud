// export interface StoredGameState {
// 	team1Name: string;
// 	team2Name: string;
// 	hasStarted: boolean;
// 	currentRound: number;
// 	rounds: Array<StoredRound>;

import type { StoredRound } from './types';

// }
export class D1GameStateRepository {
	constructor(private readonly db: D1Database) {}
	// async getGameState(): Promise<StoredGameState | null> {
	// 	const rounds = this.db.prepare('SELECT * FROM Round LEFT JOIN Answer ON ()').all();
	// 	const gameState = this.db.prepare('select * from GameState').all();
	// }
	// private roundDataToStoredRound(round: Array<Record<string, unknown>>): StoredRound {}

	async createRound(round: StoredRound): Promise<void> {
		const answerPromised = round.answers.map((answer) => {
			return this.db
				.prepare(
					'INSERT INTO Answer (id, roundId, answer, value, isVisible) VALUES (?, ?, ?, ?, ?)'
				)
				.bind(answer.id, round.id, answer.answer, answer.value, answer.isVisible)
				.run();
		});
		const roundPromise = this.db
			.prepare(
				'INSERT INTO Round (id, question, isCurrent, isComplete, playOrder, playingTeam, winningTeam, wrongGuesses) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
			)
			.bind(
				round.id,
				round.question,
				round.isCurrent,
				round.isComplete,
				round.playOrder,
				round.playingTeam,
				round.winningTeam,
				round.wrongGuesses
			)
			.run();
		answerPromised.push(roundPromise);
		await Promise.all(answerPromised);
	}
}
