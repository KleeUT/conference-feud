import {
	FileBackedGameStateRepository,
	FileBackedQuestionRepository,
	FileBackedSurveyRepository,
	GameService,
	SurveyService
} from '$lib/services';
import { newUUID } from '$lib/utils/uuid';
import type { Actions, PageServerLoad } from './$types';

const surveyIdCookie = 'surveyId';

function setup(): { gameService: GameService; surveyService: SurveyService } {
	const repository = new FileBackedGameStateRepository();
	const questionRepository = new FileBackedQuestionRepository();
	const gameService = new GameService(repository, questionRepository);
	const surveyRepository = new FileBackedSurveyRepository();
	const surveyService = new SurveyService(surveyRepository, questionRepository);
	return { gameService, surveyService };
}

export const load: PageServerLoad = async (event) => {
	const { gameService } = setup();
	const surveyId = event.cookies.get(surveyIdCookie);
	if (!surveyId) {
		const id = newUUID();
		event.cookies.set(surveyIdCookie, id, { path: '/', httpOnly: true });
	}

	const questions = await gameService.allQuestions();
	return {
		questions: questions.map((x) => ({
			...x,
			id: x.id.toJSON()
		}))
	};
};

export const actions: Actions = {
	setResult: (event) => {}
};
