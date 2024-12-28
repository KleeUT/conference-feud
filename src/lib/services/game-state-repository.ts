import type { GameState } from '../types/game-state';
import { join } from 'path';
import { promises as fs } from 'node:fs';

export interface GameStateRepository {
	save(state: GameState): Promise<void>;
	load(): Promise<GameState>;
}

export class FileBackedGameStateRepository implements GameStateRepository {
	private file: string;
	constructor() {
		this.file = join(__dirname, 'data', 'data.json');
	}
	async save(state: GameState): Promise<void> {
		const stringState = JSON.stringify(state);
		await fs.writeFile(this.file, stringState);
	}

	async load(): Promise<GameState> {
		const stringState = await fs.readFile(this.file, 'utf-8');
		const state = JSON.parse(stringState) as GameState;
		return state;
	}
}
