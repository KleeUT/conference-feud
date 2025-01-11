import type { QuestionId } from './question-id';

export interface Question {
	id: QuestionId;
	text: string;
	surveyOrder: number;
}
