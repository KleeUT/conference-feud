import type { QuestionId } from '../question';

export interface SurveyResponse {
	questionId: QuestionId;
	answer?: string;
	mapping?: string;
}
