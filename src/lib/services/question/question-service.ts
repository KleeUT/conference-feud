import { CouldBeAnError } from '$lib/types/could-be-an-error';
import type { Question } from '$lib/services/question/question';
import { QuestionId } from '$lib/services/question/question-id';
import { newUUID } from '$lib/utils/uuid';
import type { QuestionRepository } from './question-repository';

export class QuestionService {
	constructor(private readonly questionRepository: QuestionRepository) {}

	async allQuestions(): Promise<Array<Question>> {
		const questions = this.questionRepository.getAllQuestions();
		return questions;
	}

	async question(questionId: QuestionId): Promise<CouldBeAnError<Question>> {
		const questions = await this.questionRepository.getAllQuestions();
		const question = questions.find((x) => QuestionId.areEqual(x.id, questionId));
		if (question) {
			return CouldBeAnError.withValue<Question>(question);
		}
		return CouldBeAnError.withError(new Error(`No question found for ${questionId.value}`));
	}

	async addQuestion(text: string): Promise<QuestionId> {
		const questionId = new QuestionId(newUUID());
		const allQuestions = this.questionRepository.getAllQuestions();
		await this.questionRepository.storeQuestion({
			id: questionId,
			surveyOrder: (await allQuestions).length + 1,
			text
		});
		return questionId;
	}

	async deleteQuestion(questionId: QuestionId) {
		await this.questionRepository.deleteQuestion(questionId);
	}
}
