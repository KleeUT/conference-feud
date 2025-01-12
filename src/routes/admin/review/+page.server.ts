import type { Actions, PageServerLoad } from './$types';
import { setup } from '../../context';

export const load: PageServerLoad = async (event) => {
	const { surveyService } = setup(event.platform);
	const surveyResponses = await surveyService.allResponses();
	const flattenedResponses = surveyResponses.map((x) => ({ ...x, questionId: x.questionId.value }));

	return {
		surveyResponses: flattenedResponses
	};
};

export const actions: Actions = {};
