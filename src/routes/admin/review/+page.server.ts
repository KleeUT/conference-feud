import type { Actions, PageServerLoad } from './$types';
import { setup } from '../../context';
import type { AggregatedSurveyQuestion } from '$lib/services/survey/survey-service';
import { QuestionId, type QuestionService } from '$lib/services';

export const load: PageServerLoad = async (event) => {
	const { surveyService, questionService } = setup(event.platform);
	const questionId = event.url.searchParams.get('questionId');
	const surveyResponses = await surveyService.allResponses();
	// const flattenedResponses = await Promise.all(
	// 	surveyResponses.map(async (x) => {
	// 		const question = await questionService.question(x.questionId);

	// 		return { ...x, questionId: x.questionId.value, questionText: question.value.text };
	// 	})
	// );

	let questionIndex = 0;
	if (questionId) {
		questionIndex = surveyResponses.findIndex((x) =>
			x.questionId.equals(new QuestionId(questionId))
		);
	}
	console.log({ questionId, questionIndex, url: event.url });
	return {
		question: await flattenQuestion(questionService, surveyResponses[questionIndex]),
		nextQuestion: surveyResponses[questionIndex + 1]
			? await flattenQuestion(questionService, surveyResponses[questionIndex + 1])
			: undefined,
		previousQuestion: surveyResponses[questionIndex - 1]
			? await flattenQuestion(questionService, surveyResponses[questionIndex - 1])
			: undefined
	};
};

export const actions: Actions = {};

async function flattenQuestion(
	questionService: QuestionService,
	surveyResponses: AggregatedSurveyQuestion
): Promise<
	Omit<AggregatedSurveyQuestion, 'questionId'> & { questionId: string; questionText: string }
> {
	const questionDetails = await questionService.question(surveyResponses.questionId);

	return {
		...surveyResponses,
		questionId: surveyResponses.questionId.value,
		questionText: questionDetails.value.text
	};
}
