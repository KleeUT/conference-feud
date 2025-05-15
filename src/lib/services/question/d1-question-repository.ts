import { retry } from '$lib/utils/retry';
import type { Question } from './question';
import { QuestionId } from './question-id';
import type { QuestionRepository } from './question-repository';

export class D1QuestionRepository implements QuestionRepository {
	constructor(private readonly db: D1Database) {}
	async storeQuestion(question: Question): Promise<void> {
		const res = await retry(() =>
			this.db
				.prepare('INSERT INTO Question (questionId, questionText, surveyOrder) values (?,?,?)')
				.bind(question.id.value, question.text, question.surveyOrder)
				.run()
		);
		if (!res.success) {
			console.error(res.error);
		}
	}
	async getAllQuestions(): Promise<Array<Question>> {
		const res = await retry(() =>
			this.db.prepare('SELECT questionId, questionText, surveyOrder FROM Question').all()
		);
		if (!res.success) {
			console.error(res.error);
		}
		return res.results.map((x) => {
			return {
				id: new QuestionId(x['questionId'] as string),
				text: x['questionText'] as string,
				surveyOrder: x['surveyOrder'] as number
			};
		});
	}

	async deleteQuestion(questionId: QuestionId): Promise<void> {
		const res = await retry(() =>
			this.db.prepare('DELETE FROM Question WHERE questionId=?').bind(questionId.value).all()
		);
		if (!res.success) {
			console.error(res.error);
		}
	}
}
