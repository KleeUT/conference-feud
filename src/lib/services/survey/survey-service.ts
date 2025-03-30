import { QuestionId } from '$lib/services/question/question-id';
import { SurveyId } from '$lib/types/survey-id';
import type { QuestionService } from '../question';
import type { SurveyRepository } from './survey-repository';
export interface SurveyQuestionViewModel {
	questionText: string;
	questionId: QuestionId;
	answer?: string;
	surveyOrder: number;
}

export type AggregatedSurveyQuestion = {
	questionId: QuestionId;
	answers: Array<{ answer: string; count: number; mapping?: string }>;
};

export class SurveyService {
	constructor(
		private readonly surveyRepository: SurveyRepository,
		private readonly questionService: QuestionService
	) {}

	async questionsForSurvey(surveyId: SurveyId): Promise<Array<SurveyQuestionViewModel>> {
		const survey = await this.surveyRepository.load(surveyId);
		if (survey.isError) {
			throw survey.error;
		}
		const responses = survey.value;
		const allQuestions = await this.questionService.allQuestions();
		const viewModels: Array<SurveyQuestionViewModel> = allQuestions.map((x) => ({
			questionId: x.id,
			surveyOrder: x.surveyOrder,
			questionText: x.text,
			answer: responses.find((surveyResponse) => surveyResponse.questionId.equals(x.id))?.answer
		}));
		return viewModels;
	}

	async allResponses(): Promise<Array<AggregatedSurveyQuestion>> {
		const rawResponses = await this.surveyRepository.loadAll();
		if (rawResponses.isError) {
			throw rawResponses.error;
		}

		return rawResponses.value.reduce<Array<AggregatedSurveyQuestion>>((acc, response) => {
			if (!response.answer) {
				return acc;
			}
			const index = acc.findIndex((r) => r.questionId.equals(response.questionId));
			if (index !== -1) {
				const answerIndex = acc[index].answers.findIndex((x) => x.answer === response.answer);
				if (answerIndex !== -1) {
					acc[index].answers[answerIndex].count++;
				} else {
					acc[index].answers.push({ answer: response.answer, count: 1, mapping: response.mapping });
				}
			} else {
				const question = {
					questionId: response.questionId,
					answers: [{ answer: response.answer, count: 1, mapping: response.mapping }]
				};
				acc.push(question);
			}

			return acc;
		}, []);
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
			answer,
			submissionTime: new Date()
		});
	}
	async updateMapping({
		questionId,
		answerText,
		newMapping
	}: {
		questionId: string;
		answerText: string;
		newMapping: string;
	}): Promise<void> {
		await this.surveyRepository.updateMapping({
			questionId: new QuestionId(questionId),
			answerText,
			newMapping
		});
	}
}
