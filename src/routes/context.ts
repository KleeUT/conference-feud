import { D1SurveyRepository, QuestionService, SurveyService } from '$lib/services';
import { D1QuestionRepository } from '$lib/services/question/d1-question-repository';
import { D1SessionStore, SessionService, type Session } from '$lib/services/session';
import { mustBeLoggedIn } from '$lib/auth/auth-utils';
import type { Cookies } from '@sveltejs/kit';
import { constants } from './auth/constants';
import { GameService } from '$lib/services/game/game-service';
import { D1GameStateRepository } from '$lib/services/game/d1-game-repository';
import { ServerSentEventSender } from '$lib/services/eventSender';
export function setup(platform: Readonly<App.Platform> | undefined): {
	questionService: QuestionService;
	surveyService: SurveyService;
	sessionService: SessionService;
	gameService: GameService;
	validateSession: (cookies: Cookies) => Promise<Session>;
	sseSender: ServerSentEventSender;
} {
	const env = platform?.env;
	if (!env) {
		throw new Error('nope');
	}

	const questionRepository = new D1QuestionRepository(env.DB);
	const questionService = new QuestionService(questionRepository);
	const surveyRepository = new D1SurveyRepository(env.DB);
	const surveyService = new SurveyService(surveyRepository, questionService);
	const sessionService = new SessionService(new D1SessionStore(env.DB));
	const sseSender = ServerSentEventSender.create();
	const validateSession = async (cookies: Cookies) => {
		return await mustBeLoggedIn(sessionService, cookies.get(constants.sessionId));
	};
	const gameService = new GameService(new D1GameStateRepository(env.DB), sseSender);
	return {
		questionService,
		surveyService,
		sessionService,
		validateSession,
		gameService,
		sseSender
	};
}
