import type { QuestionId } from './question-id';

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

export interface Question {
	id: QuestionId;
	text: string;
	surveyOrder: number;
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
