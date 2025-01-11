import type { Question } from './question';
import { QuestionId } from './question-id';
import type { QuestionRepository } from './question-repository';

export class D1QuestionRepository implements QuestionRepository {
	constructor(private readonly db: D1Database) {}
	async storeQuestion(question: Question): Promise<void> {
		console.log('storing question ', question);
		const res = await this.db
			.prepare('INSERT INTO Question (questionId, questionText, surveyOrder) values (?,?,?)')
			.bind(question.id.value, question.text, question.surveyOrder)
			.run();
		if (!res.success) {
			console.error(res.error);
		}
	}
	async getAllQuestions(): Promise<Array<Question>> {
		console.log('Querying questions');
		const res = await this.db
			.prepare('SELECT questionId, questionText, surveyOrder FROM Question')
			.all();
		if (!res.success) {
			console.error(res.error);
		}
		return res.results.map((x) => {
			console.log('all questions', x);
			return {
				id: new QuestionId(x['questionId'] as string),
				text: x['questionText'] as string,
				surveyOrder: x['surveyOrder'] as number
			};
		});
	}

	async deleteQuestion(questionId: QuestionId): Promise<void> {
		console.log('Deleting question', questionId);
		const res = await this.db
			.prepare('DELETE FROM Question WHERE questionId=?')
			.bind(questionId.value)
			.all();
		if (!res.success) {
			console.error(res.error);
		}
	}
}
