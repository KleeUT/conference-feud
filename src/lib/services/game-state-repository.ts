import type { GameState } from '$lib/types/game-state';

export interface GameStateRepository {
	save(state: GameState): Promise<void>;
	load(): Promise<GameState>;
}
