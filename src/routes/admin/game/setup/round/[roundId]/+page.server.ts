import { setup } from '../../../../../context';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return {
		question: {
			questionId: params.roundId,
			question: 'is a hotdog a sandwich?',
			answers: {
				answer1: {
					text: 'hotdog1',
					value: 25
				},
				answer2: {
					text: 'hotdog2',
					value: 25
				},
				answer3: {
					text: 'hotdo3',
					value: 25
				},
				answer4: {
					text: 'hotdog4',
					value: 25
				},
				answer5: {
					text: 'hotdog5',
					value: 25
				},
				answer6: {
					text: 'hotdog6',
					value: 25
				},
				answer7: { text: '', value: 0 },
				answer8: { text: '', value: 0 }
			}
		}
	};
};

export const actions: Actions = {
	default: async ({ request, platform }) => {
		// const { gameService } = setup(platform);
		// const formData = await request.formData();
		// const answer1Value = formData.get('answer1Value') as string;
		// const answer2Value = formData.get('answer2Value') as string;
		// const answer3Value = formData.get('answer3Value') as string;
		// const answer4Value = formData.get('answer4Value') as string;
		// const answer5Value = formData.get('answer5Value') as string;
		// const answer6Value = formData.get('answer6Value') as string;
		// const answer7Value = formData.get('answer7Value') as string;
		// const answer8Value = formData.get('answer8Value') as string;
		// const answer1Text = formData.get('answer1Text') as string;
		// const answer2Text = formData.get('answer2Text') as string;
		// const answer3Text = formData.get('answer3Text') as string;
		// const answer4Text = formData.get('answer4Text') as string;
		// const answer5Text = formData.get('answer5Text') as string;
		// const answer6Text = formData.get('answer6Text') as string;
		// const answer7Text = formData.get('answer7Text') as string;
		// const answer8Text = formData.get('answer8Text') as string;
		// const answer1Id = formData.get('answer1Id') as string | undefined;
		// const answer2Id = formData.get('answer2Id') as string | undefined;
		// const answer3Id = formData.get('answer3Id') as string | undefined;
		// const answer4Id = formData.get('answer4Id') as string | undefined;
		// const answer5Id = formData.get('answer5Id') as string | undefined;
		// const answer6Id = formData.get('answer6Id') as string | undefined;
		// const answer7Id = formData.get('answer7Id') as string | undefined;
		// const answer8Id = formData.get('answer8Id') as string | undefined;
		// const question = formData.get('question') as string;
		// await gameService.createRound({
		// 	answer: question
		// });
	}
};
