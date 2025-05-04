import type { Actions, PageServerLoad } from './$types';
import { setup } from '../../context';
import type { AggregatedSurveyQuestion } from '$lib/services/survey/survey-service';
import { QuestionId, type QuestionService } from '$lib/services';

export const load: PageServerLoad = async (event) => {
	const { surveyService, questionService, validateSession } = setup(event.platform);
	validateSession(event.cookies);
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

async function flattenQuestion(
	questionService: QuestionService,
	surveyResponses: AggregatedSurveyQuestion
): Promise<
	Omit<AggregatedSurveyQuestion, 'questionId'> & {
		questionId: string;
		questionText: string;
		topMapped: { [mapping: string]: number };
	}
> {
	const questionDetails = await questionService.question(surveyResponses.questionId);
	const topMapped = surveyResponses.answers.reduce(
		(mapping, answer) => {
			const mappedText = answer.mapping || answer.answer;
			if (mapping[mappedText]) {
				mapping[mappedText] = mapping[mappedText] + answer.count;
			} else {
				mapping[mappedText] = answer.count;
			}
			return mapping;
		},
		{} as { [key: string]: number }
	);

	return {
		...surveyResponses,
		questionId: surveyResponses.questionId.value,
		questionText: questionDetails.value.text,
		topMapped
	};
}
export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const { surveyService } = setup(event.platform);
		const questionId = data.get('questionId') as string;
		const newMapping = data.get('newMapping') as string;
		const answerText = data.get('answerText') as string;
		await surveyService.updateMapping({ questionId, answerText, newMapping });
	}
};
