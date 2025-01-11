import type { Question } from './question';
import type { QuestionId } from '$lib/services/question/question-id';

export interface QuestionRepository {
	storeQuestion(question: Question): Promise<void>;
	getAllQuestions(): Promise<Array<Question>>;
	deleteQuestion(questionId: QuestionId): Promise<void>;
}
