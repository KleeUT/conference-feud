import { CouldBeAnError } from '$lib/types/could-be-an-error';
import type { SurveyId } from '$lib/types/survey-id';
import { join } from 'path';

import { readFile, writeFile } from 'fs/promises';
import { mkdirSync, existsSync } from 'fs';
import { QuestionId } from '$lib/services/question/question-id';
import type { SurveyResponse } from './survey-response';

export interface StoredSurveyResponse {
	questionId: string;
	answer?: string;
}

export class FileBackedSurveyRepository {
	private readonly baseDirectory;
	constructor() {
		this.baseDirectory = join(process.cwd(), 'data', 'survey-results');
		if (!existsSync(this.baseDirectory)) {
			mkdirSync(this.baseDirectory);
		}
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
		const fileName = this.pathForSurveyId(surveyId);
		let data = await this.readFile(fileName);
		const index = data.findIndex((x) => x.questionId === questionId.value);
		if (index === -1) {
			data = [...data, { questionId: questionId.value, answer }] as Array<StoredSurveyResponse>;
		} else {
			data[index].answer = answer;
		}
		await this.writeFile(fileName, data);
		return CouldBeAnError.withNoValue();
	}
	async load(surveyId: SurveyId): Promise<CouldBeAnError<Array<SurveyResponse>>> {
		const fileName = this.pathForSurveyId(surveyId);

		const responses = (await this.readFile(fileName)).map(storedToSurveyResponse);

		return CouldBeAnError.withValue(responses);
	}

	private pathForSurveyId(surveyId: SurveyId): string {
		return join(this.baseDirectory, `${surveyId.value}.json`);
	}

	private async readFile(fileName: string): Promise<Array<StoredSurveyResponse>> {
		if (!existsSync(fileName)) {
			return [];
		}
		const data = await readFile(fileName, 'utf-8');
		return JSON.parse(data);
	}
	private async writeFile(fileName: string, question: Array<StoredSurveyResponse>): Promise<void> {
		await writeFile(fileName, JSON.stringify(question), 'utf-8');
	}
}

function storedToSurveyResponse(stored: StoredSurveyResponse): SurveyResponse {
	return {
		...stored,
		questionId: new QuestionId(stored.questionId)
	};
}
