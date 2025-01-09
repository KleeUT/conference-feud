import { NoOpQuestionRepository, NoOpSurveyRepository, SurveyService } from '$lib/services';
import { SurveyId } from '$lib/types/survey-id';
import { newUUID } from '$lib/utils/uuid';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const surveyIdCookieKey = 'surveyId';

function setup(): { surveyService: SurveyService } {
	const questionRepository = new NoOpQuestionRepository();
	const surveyRepository = new NoOpSurveyRepository();
	const surveyService = new SurveyService(surveyRepository, questionRepository);
	return { surveyService };
}

export const load: PageServerLoad = async (event) => {
	const { surveyService } = setup();
	let surveyIdCookieValue = event.cookies.get(surveyIdCookieKey);
	if (!surveyIdCookieValue) {
		surveyIdCookieValue = newUUID();
		event.cookies.set(surveyIdCookieKey, surveyIdCookieValue, { path: '/', httpOnly: true });
	}
	const surveyId = new SurveyId(surveyIdCookieValue);
	const questions = await surveyService.questionsForSurvey(surveyId);

	const pojoQestions = questions.map((x) => ({
		...x,
		questionId: x.questionId.value
	}));
	const remainingQuestions = pojoQestions
		.sort((a, b) => a.surveyOrder - b.surveyOrder)
		.filter((x) => x.answer === undefined);

	return {
		surveyId: surveyId.value,
		question: remainingQuestions[0],
		hasNextQuestion: remainingQuestions.length > 1
	};
};

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const answer = data.get('answer')?.toString();
		const questionId = data.get('questionId');
		const surveyIdCookieValue = event.cookies.get(surveyIdCookieKey);
		if (!surveyIdCookieValue) {
			return fail(401, { error: 'no cookie' });
		}
		if (!answer) {
			return fail(400, { answer, mising: true, error: 'Missing answer' });
		}
		if (!questionId) {
			return fail(400, { questionId, mising: true, error: 'Missing questionId' });
		}
		if (answer.length > 100) {
			return fail(400, { answer, error: 'Answer length too long' });
		}
		const { surveyService } = setup();
		await surveyService.storeAnswer({
			surveyId: surveyIdCookieValue,
			questionId: questionId.toString(),
			answer: answer.toString()
		});
	}
};
