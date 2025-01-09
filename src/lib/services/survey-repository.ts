import type { CouldBeAnError } from '$lib/types/could-be-an-error';
import type { QuestionId } from '$lib/types/question-id';
import type { SurveyId } from '$lib/types/survey-id';
import type { SurveyResponse } from './file-backed-survey-repository';

export interface SurveyRepository {
	store({
		surveyId,
		questionId,
		answer
	}: {
		surveyId: SurveyId;
		questionId: QuestionId;
		answer: string;
	}): Promise<CouldBeAnError<void>>;
	load(surveyId: SurveyId): Promise<CouldBeAnError<Array<SurveyResponse>>>;
}
