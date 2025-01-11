import { fail } from '@sveltejs/kit';
import { QuestionService } from '$lib/services';
import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { QuestionId } from '$lib/services/question/question-id';
import { D1QuestionRepository } from '$lib/services/question/d1-question-repository';

function setup(event: RequestEvent): { service: QuestionService } {
	const env = event.platform?.env;
	if (!env) {
		throw new Error('nope');
	}
	const questionRepository = new D1QuestionRepository(env.DB);
	const service = new QuestionService(questionRepository);
	return { service };
}

export const load: PageServerLoad = async (event) => {
	const { service } = setup(event);
	const questions = await service.allQuestions();
	return {
		questions: questions.map((x) => ({
			...x,
			id: x.id.toJSON()
		}))
	};
};

export const actions = {
	addQuestion: async (event) => {
		console.log('Adding question');
		const { service } = setup(event);
		const data = await event.request.formData();
		const questionText = data.get('questionText')?.valueOf() as string | undefined;
		if (!questionText) {
			return fail(400, { questionText, missing: true });
		}
		await service.addQuestion(questionText);
	},

	deleteQuestion: async (event) => {
		const { service } = setup(event);

		const data = await event.request.formData();
		const questionId = data.get('questionId')?.valueOf() as string | undefined;
		if (!questionId) {
			fail(400, { questionId, missing: true });
		}
		await service.deleteQuestion(new QuestionId(questionId!));
	}
} satisfies Actions;
