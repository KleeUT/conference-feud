import type { Question as SurveyQuestion } from '$lib/types/game-state';
import type { QuestionId } from '$lib/types/question-id';

export interface QuestionRepository {
	storeQuestion(question: SurveyQuestion): Promise<void>;
	getAllQuestions(): Promise<Array<SurveyQuestion>>;
	deleteQuestion(questionId: QuestionId): Promise<void>;
}
