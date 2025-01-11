import { CouldBeAnError } from '$lib/types/could-be-an-error';
import type { SurveyId } from '$lib/types/survey-id';
import { QuestionId } from '../question';
import type { SurveyRepository } from './survey-repository';
import type { SurveyResponse } from './survey-response';

export class D1SurveyRepository implements SurveyRepository {
	constructor(private readonly db: D1Database) {}
	async load(surveyId: SurveyId): Promise<CouldBeAnError<Array<SurveyResponse>>> {
		const response = await this.db
			.prepare('SELECT questionId, surveyId, response FROM Survey WHERE surveyId = ?')
			.bind(surveyId.value)
			.all();

		if (!response.success) {
			return CouldBeAnError.withError(
				response.error || new Error(`Unkown error querying survey for id ${surveyId.value}`)
			);
		}

		const surveyResponses: Array<SurveyResponse> = response.results.map(
			(rec: Record<string, unknown>): SurveyResponse => ({
				questionId: new QuestionId(rec['questionId'] as string),
				answer: rec['response'] as string
			})
		);

		return CouldBeAnError.withValue(surveyResponses);
	}
	async store({
		surveyId,
		questionId,
		answer
	}: {
		surveyId: SurveyId;
		questionId: QuestionId;
		answer: string;
	}): Promise<CouldBeAnError<void>> {
		const response = await this.db
			.prepare('INSERT INTO Survey (questionId, surveyId, response) VALUES (?,?,?)')
			.bind(questionId.value, surveyId.value, answer)
			.run();
		if (!response.success) {
			return CouldBeAnError.withError(
				response.error ||
					new Error(`Unknown error inserting ${JSON.stringify({ surveyId, questionId, answer })}`)
			);
		}
		return CouldBeAnError.withNoValue();
	}
}
