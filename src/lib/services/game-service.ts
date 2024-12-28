import { CouldBeAnError } from '../types/could-be-an-error';
import { newUUID } from '$lib/utils/uuid';
import type { Answer, GameState, Question } from '../types/game-state';
import { QuestionId } from '../types/question-id';
import type { GameStateRepository } from './game-state-repository';
export class GameService {
	constructor(private readonly gameStateRepository: GameStateRepository) {}

	async fullState(): Promise<GameState> {
		const gameState = await this.gameStateRepository.load();
		return gameState;
	}

	async allQuestions(): Promise<Array<Question>> {
		const gameState = await this.gameStateRepository.load();
		const questions = gameState.questions || [];
		return questions;
	}

	async question(questionId: QuestionId): Promise<CouldBeAnError<Question>> {
		const gameState = await this.gameStateRepository.load();
		const questions = gameState.questions || [];
		const question = questions.find((x) => QuestionId.areEqual(x.id, questionId));
		if (question) {
			return CouldBeAnError.withValue<Question>(question);
		}
		return CouldBeAnError.withError(new Error(`No question found for ${questionId.value}`));
	}

	async addQuestion(text: string): Promise<QuestionId> {
		const gameState = await this.gameStateRepository.load();
		const questions = gameState.questions || [];
		const questionId = new QuestionId(newUUID());
		questions.push({ id: questionId, answers: [], text });
		gameState.questions = questions;
		this.gameStateRepository.save(gameState);
		return questionId;
	}

	async deleteQuestion(questionId: QuestionId) {
		const gameState = await this.gameStateRepository.load();
		const questions = gameState.questions || [];
		const index = questions.findIndex((x) => QuestionId.areEqual(questionId, x.id));
		gameState.questions = questions.toSpliced(index, 1);
		this.gameStateRepository.save(gameState);
	}

	async addAnswer(questionId: QuestionId, answer: Answer): Promise<CouldBeAnError<never>> {
		const gameState = await this.gameStateRepository.load();
		const question = gameState.questions.find((x) => QuestionId.areEqual(x.id, questionId));
		if (!question) {
			return CouldBeAnError.withError<never>(new Error(`No question for ${questionId.value}`));
		}
		question.answers.push(answer);
		this.gameStateRepository.save(gameState);
		return CouldBeAnError.withNoValue();
	}
}
