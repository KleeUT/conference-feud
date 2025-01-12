import type { CouldBeAnError } from '$lib/types/could-be-an-error';
import type { QuestionId } from '$lib/services/question/question-id';
import type { SurveyId } from '$lib/types/survey-id';
import type { SurveyResponse } from './survey-response';

export interface SurveyRepository {
	store({
		surveyId,
		questionId,
		answer,
		submissionTime
	}: {
		surveyId: SurveyId;
		questionId: QuestionId;
		answer: string;
		submissionTime: Date;
	}): Promise<CouldBeAnError<void>>;
	load(surveyId: SurveyId): Promise<CouldBeAnError<Array<SurveyResponse>>>;
	loadAll(): Promise<CouldBeAnError<Array<SurveyResponse>>>;
}
