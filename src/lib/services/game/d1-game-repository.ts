import type { OptionalTeamName, StoredGameState, StoredRound } from './types';
export class D1GameStateRepository {
	constructor(private readonly db: D1Database) {}

	async getRounds(): Promise<Array<StoredRound>> {
		const rounds = await this.db
			.prepare(
				'SELECT r.id as roundId, a.id as answerId, * FROM Round r LEFT JOIN Answer a ON r.id = a.roundId ORDER BY playOrder'
			)
			.all();

		if (rounds.error) {
			throw new Error(rounds.error);
		}

		const aggregatedRounds = rounds.results.reduce((acc, roundData) => {
			const id = roundData.roundId as string;
			if (acc.has(id)) {
				const round = acc.get(id)!;
				round.answers.push({
					id: roundData.answerId as string,
					answer: roundData.answer as string,
					value: roundData.value as number,
					isVisible: roundData.isVisible as boolean
				});
				acc.set(id, round);
			} else {
				acc.set(id, {
					id,
					question: roundData.question as string,
					isCurrent: roundData.isCurrent as boolean,
					isComplete: roundData.isComplete as boolean,
					playOrder: roundData.playOrder as number,
					playingTeam: roundData.playingTeam as OptionalTeamName,
					winningTeam: roundData.winningTeam as OptionalTeamName,
					wrongGuesses: roundData.wrongGuesses as number,

					answers: [
						{
							id: roundData.answerId as string,
							answer: roundData.answer as string,
							value: roundData.value as number,
							isVisible: roundData.isVisible as boolean
						}
					]
				} as StoredRound);
			}
			return acc;
		}, new Map<string, StoredRound>());
		return Array.from(aggregatedRounds.values());
	}

	async getRound(roundId: string): Promise<StoredRound | null> {
		const allRounds = await this.getRounds();
		const round = allRounds.find((round) => round.id === roundId);
		if (!round) {
			return null;
		}
		return round;
	}

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

	updateRound(round: StoredRound) {
		const answerPromised = round.answers.map((answer) => {
			return this.db
				.prepare('UPDATE Answer SET answer = ?, value = ?, isVisible = ? WHERE id = ?')
				.bind(answer.answer, answer.value, answer.isVisible, answer.id)
				.run();
		});
		const roundPromise = this.db
			.prepare(
				'UPDATE Round SET question = ?, isCurrent = ?, isComplete = ?, playOrder = ?, playingTeam = ?, winningTeam = ?, wrongGuesses = ? WHERE id = ?'
			)
			.bind(
				round.question,
				round.isCurrent,
				round.isComplete,
				round.playOrder,
				round.playingTeam,
				round.winningTeam,
				round.wrongGuesses,
				round.id
			)
			.run();
		answerPromised.push(roundPromise);
		return Promise.all(answerPromised);
	}

	async setTeamNames(team1Name: string, team2Name: string) {
		const gameState = await this.db.prepare('SELECT * FROM Game').first();
		if (gameState) {
			await this.db
				.prepare('UPDATE Game SET team1Name = ?, team2Name = ?')
				.bind(team1Name, team2Name)
				.run();
		} else {
			await this.db
				.prepare(
					'INSERT INTO Game (team1Name, team2Name, hasStarted, currentRound) VALUES (?, ?, 0, 0)'
				)
				.bind(team1Name ?? '', team2Name ?? '')
				.run();
		}
		return { team1Name, team2Name };
	}
	async getGameState(): Promise<StoredGameState> {
		const gameState = await this.db.prepare('SELECT * FROM Game').first<StoredGameState>();
		if (!gameState) {
			throw new Error('Game state not found');
		}
		const rounds = await this.getRounds();
		return {
			team1Name: gameState.team1Name,
			team2Name: gameState.team2Name,
			hasStarted: gameState.hasStarted,
			currentRound: gameState.currentRound,
			rounds
		};
	}
}
