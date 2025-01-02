import { QuestionId } from '$lib/types/question-id';
import { SurveyId } from '$lib/types/survey-id';
import type { FileBackedQuestionRepository } from './question-repository';
import type { FileBackedSurveyRepository } from './survey-repository';
export interface SurveyQuestionViewModel {
	questionText: string;
	questionId: QuestionId;
	answer?: string;
	surveyOrder: number;
}

export class SurveyService {
	constructor(
		private readonly surveyRepository: FileBackedSurveyRepository,
		private readonly questionRepository: FileBackedQuestionRepository
	) {}

	async questionsForSurvey(surveyId: SurveyId): Promise<Array<SurveyQuestionViewModel>> {
		const survey = await this.surveyRepository.load(surveyId);
		if (survey.isError) {
			throw survey.error;
		}
		const responses = survey.value;
		const allQuestions = await this.questionRepository.getAllQuestions();
		const viewModels: Array<SurveyQuestionViewModel> = allQuestions.map((x) => ({
			questionId: x.id,
			surveyOrder: x.surveyOrder,
			questionText: x.text,
			answer: responses.find((surveyResponse) => surveyResponse.questionId.equals(x.id))?.answer
		}));
		return viewModels;
	}

	async storeAnswer({
		surveyId,
		questionId,
		answer
	}: {
		surveyId: string;
		questionId: string;
		answer: string;
	}) {
		await this.surveyRepository.store({
			surveyId: new SurveyId(surveyId),
			questionId: new QuestionId(questionId),
			answer
		});
	}
}
