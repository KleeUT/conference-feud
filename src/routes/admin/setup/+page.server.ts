import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { QuestionId } from '$lib/services/question/question-id';
import { setup } from '../../context';

export const load: PageServerLoad = async (event) => {
	const { questionService, validateSession } = setup(event.platform);
	await validateSession(event.cookies);
	const questions = await questionService.allQuestions();
	return {
		questions: questions.map((x) => ({
			...x,
			id: x.id.toJSON()
		}))
	};
};

export const actions = {
	addQuestion: async (event) => {
		const { questionService, validateSession } = setup(event.platform);
		await validateSession(event.cookies);
		const data = await event.request.formData();
		const questionText = data.get('questionText')?.valueOf() as string | undefined;
		if (!questionText) {
			return fail(400, { questionText, missing: true });
		}
		await questionService.addQuestion(questionText);
	},

	deleteQuestion: async (event) => {
		const { questionService, validateSession } = setup(event.platform);
		await validateSession(event.cookies);

		const data = await event.request.formData();
		const questionId = data.get('questionId')?.valueOf() as string | undefined;
		if (!questionId) {
			fail(400, { questionId, missing: true });
		}
		await questionService.deleteQuestion(new QuestionId(questionId!));
	}
} satisfies Actions;
