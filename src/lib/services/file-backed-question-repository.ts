import type { Question as SurveyQuestion } from '$lib/types/game-state';
import { QuestionId } from '$lib/types/question-id';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

interface StoredQuestion {
	id: string;
	text: string;
	surveyOrder: number;
}

export class FileBackedQuestionRepository {
	private file: string;
	constructor() {
		this.file = join(process.cwd(), 'data', 'questions.json');
	}

	async storeQuestion(question: SurveyQuestion) {
		const valueToStore = questionToStoredQuestion(question);
		const allQuestions = await this.readFile();
		await this.writeFile([...allQuestions, valueToStore]);
	}

	async getAllQuestions(): Promise<Array<SurveyQuestion>> {
		if (!existsSync(this.file)) {
			this.writeFile([]);
			return [];
		}
		const data = await this.readFile();
		return (data || []).map(storedQuestionToQuestion);
	}

	async deleteQuestion(questionId: QuestionId) {
		const questions = await this.readFile();
		const index = questions.findIndex((x) => questionId.value === x.id);
		this.writeFile(questions.toSpliced(index, 1));
	}

	private async readFile(): Promise<Array<StoredQuestion>> {
		const data = await readFile(this.file, 'utf-8');
		return JSON.parse(data);
	}
	private async writeFile(question: Array<StoredQuestion>): Promise<void> {
		await writeFile(this.file, JSON.stringify(question), 'utf-8');
	}
}

function questionToStoredQuestion(question: SurveyQuestion): StoredQuestion {
	return {
		id: question.id.value,
		text: question.text,
		surveyOrder: question.surveyOrder
	};
}

function storedQuestionToQuestion(question: StoredQuestion): SurveyQuestion {
	return {
		id: new QuestionId(question.id),
		text: question.text,
		surveyOrder: question.surveyOrder
	};
}
