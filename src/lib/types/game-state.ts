import type { QuestionId } from '../services/question/question-id';

export interface Team {
	name: string;
	score: number;
}

export interface Answer {
	text: string;
	value: number;
	displayOrder: number;
	exposed: boolean;
}

export interface GameQuestion {
	id: QuestionId;
	text: string;
	playOrder: number;
	answers: Array<Answer>;
	score: number;
	winningTeam: string;
}

export interface GameState {
	teams: Array<Team>;
	questions: Array<GameQuestion>;
}
