import { FileBackedGameStateRepository, GameService } from '$lib/services';
import { newUUID } from '$lib/utils/uuid';
import type { Actions, PageServerLoad } from './$types';
import { QuestionId } from '$lib/types/question-id';

const surveyIdCookie = 'surveyId';

function setup(): { service: GameService } {
	const repository = new FileBackedGameStateRepository();
	const gameService = new GameService(repository);
  const 
	return { service: gameService };
}


export const load: PageServerLoad = async (event) => {
	const { service } = setup();
	const surveyId = event.cookies.get(surveyIdCookie);
	if (!surveyId) {
		const id = newUUID();
		event.cookies.set(surveyIdCookie, id, { path: '/', httpOnly: true });
	}

	const gameState = await service.fullState();
	const questions = gameState.questions;
	return { questions };
};

export const actions: Actions = {
  setResult:(event) => {}

}