import type { QuestionId } from './question-id';

export interface Team {
	name: string;
	score: number;
}

export interface Answer {
	text: string;
	value: number;
	index: number;
	exposed: boolean;
}

export interface Question {
	id: QuestionId;
	text: string;
	answers: Array<Answer>;
}

export interface GameState {
	teams: Array<Team>;
	questions: Array<Question>;
}
