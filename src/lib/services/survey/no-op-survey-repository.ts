import { CouldBeAnError } from '$lib/types/could-be-an-error';
import type { QuestionId } from '$lib/services/question/question-id';
import type { SurveyId } from '$lib/types/survey-id';
import type { SurveyResponse } from './survey-response';
import type { SurveyRepository } from './survey-repository';

export class NoOpSurveyRepository implements SurveyRepository {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	store(_: {
		surveyId: SurveyId;
		questionId: QuestionId;
		answer: string;
	}): Promise<CouldBeAnError<void>> {
		return Promise.resolve(CouldBeAnError.withNoValue());
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	load(_: SurveyId): Promise<CouldBeAnError<Array<SurveyResponse>>> {
		return Promise.resolve(CouldBeAnError.withValue([]));
	}
	loadAll(): Promise<CouldBeAnError<Array<SurveyResponse>>> {
		return Promise.resolve(CouldBeAnError.withValue([]));
	}
}
