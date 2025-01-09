import type { GameState } from '$lib/types/game-state';
import type { GameStateRepository } from './game-state-repository';

export class NoOpGameStateRepository implements GameStateRepository {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async save(_: GameState): Promise<void> {}
	async load(): Promise<GameState> {
		return { teams: [], questions: [] };
	}
}
