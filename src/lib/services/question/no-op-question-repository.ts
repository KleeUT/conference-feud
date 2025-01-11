import type { Question } from './question';
import type { QuestionId } from '$lib/services/question/question-id';
import type { QuestionRepository } from './question-repository';

export class NoOpQuestionRepository implements QuestionRepository {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async storeQuestion(_question: Question): Promise<void> {
		return Promise.resolve();
	}
	async getAllQuestions(): Promise<Array<Question>> {
		return [];
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async deleteQuestion(_questionId: QuestionId): Promise<void> {
		return Promise.resolve();
	}
}
