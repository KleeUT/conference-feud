import { fail } from '@sveltejs/kit';
import { FileBackedGameStateRepository, GameService } from '$lib/services';
import type { Actions, PageServerLoad } from './$types';
import { QuestionId } from '$lib/types/question-id';

function setup(): { service: GameService } {
	const repository = new FileBackedGameStateRepository();
	const service = new GameService(repository);
	return { service };
}

export const load: PageServerLoad = async () => {
	const { service } = setup();
	const gameState = await service.fullState();
	return { gameState };
};

export const actions = {
	addQuestion: async (event) => {
		const { service } = setup();
		const data = await event.request.formData();
		const questionText = data.get('questionText')?.valueOf() as string | undefined;
		if (!questionText) {
			return fail(400, { questionText, missing: true });
		}
		await service.addQuestion(questionText);
	},
	deleteQuestion: async (event) => {
		const { service } = setup();

		const data = await event.request.formData();
		const questionId = data.get('questionId')?.valueOf() as string | undefined;
		if (!questionId) {
			fail(400, { questionId, missing: true });
		}
		await service.deleteQuestion(new QuestionId(questionId!));
	}
} satisfies Actions;