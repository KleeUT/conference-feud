import { D1SurveyRepository, QuestionService, SurveyService } from '$lib/services';
import { D1QuestionRepository } from '$lib/services/question/d1-question-repository';
import { D1SessionStore, SessionService, type Session } from '$lib/services/session';
import { mustBeLoggedIn } from '$lib/auth/auth-utils';
import type { Cookies } from '@sveltejs/kit';
import { constants } from './auth/constants';
export function setup(platform: Readonly<App.Platform> | undefined): {
	questionService: QuestionService;
	surveyService: SurveyService;
	sessionService: SessionService;
	validateSession: (cookies: Cookies) => Promise<Session>;
} {
	const env = platform?.env;
	if (!env) {
		throw new Error('nope');
	}
	console.log('env', Object.keys(env));
	const questionRepository = new D1QuestionRepository(env.DB);
	const questionService = new QuestionService(questionRepository);
	const surveyRepository = new D1SurveyRepository(env.DB);
	const surveyService = new SurveyService(surveyRepository, questionService);
	const sessionService = new SessionService(new D1SessionStore(env.DB));
	const validateSession = async (cookies: Cookies) => {
		return await mustBeLoggedIn(sessionService, cookies.get(constants.sessionId));
	};
	return { questionService, surveyService, sessionService, validateSession };
}
