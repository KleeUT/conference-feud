import { CouldBeAnError } from '../types/could-be-an-error';
import { newUUID } from '$lib/utils/uuid';
import type { Answer, Question } from '../types/game-state';
import { QuestionId } from '../types/question-id';
import type { GameStateRepository } from './game-state-repository';
import type { QuestionRepository } from './question-repository';
export class GameService {
	constructor(
		private readonly gameStateRepository: GameStateRepository,
		private readonly questionRepository: QuestionRepository
	) {}

	// async fullState(): Promise<GameState> {
	// 	const gameState = await this.gameStateRepository.load();
	// 	return gameState;
	// }

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

	async addAnswer(questionId: QuestionId, answer: Answer): Promise<CouldBeAnError<never>> {
		const gameState = await this.gameStateRepository.load();
		const question = gameState.questions.find((x) => x.id.value === questionId.value);
		if (!question) {
			return CouldBeAnError.withError<never>(new Error(`No question for ${questionId.value}`));
		}
		question.answers.push(answer);
		this.gameStateRepository.save(gameState);
		return CouldBeAnError.withNoValue();
	}
}
