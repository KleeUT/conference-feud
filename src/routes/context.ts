import { D1SurveyRepository, QuestionService, SurveyService } from '$lib/services';
import { D1QuestionRepository } from '$lib/services/question/d1-question-repository';

export function setup(platform: Readonly<App.Platform> | undefined): {
	questionService: QuestionService;
	surveyService: SurveyService;
} {
	const env = platform?.env;
	if (!env) {
		throw new Error('nope');
	}
	const questionRepository = new D1QuestionRepository(env.DB);
	const questionService = new QuestionService(questionRepository);
	const surveyRepository = new D1SurveyRepository(env.DB);
	const surveyService = new SurveyService(surveyRepository, questionService);
	return { questionService, surveyService };
}
