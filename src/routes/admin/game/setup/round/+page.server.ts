import { setup } from '../../../../context';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		question: {
			question: '',
			answers: {
				answer1: { text: '', value: 0 },
				answer2: { text: '', value: 0 },
				answer3: { text: '', value: 0 },
				answer4: { text: '', value: 0 },
				answer5: { text: '', value: 0 },
				answer6: { text: '', value: 0 },
				answer7: { text: '', value: 0 },
				answer8: { text: '', value: 0 }
			}
		}
	};
};

export const actions: Actions = {
	default: async ({ request, platform }) => {
		const { gameService } = setup(platform);
		const formData = await request.formData();
		const answer1Value = formData.get('answer1Value') as string;
		const answer2Value = formData.get('answer2Value') as string;
		const answer3Value = formData.get('answer3Value') as string;
		const answer4Value = formData.get('answer4Value') as string;
		const answer5Value = formData.get('answer5Value') as string;
		const answer6Value = formData.get('answer6Value') as string;
		const answer7Value = formData.get('answer7Value') as string;
		const answer8Value = formData.get('answer8Value') as string;
		const answer1Text = formData.get('answer1Text') as string;
		const answer2Text = formData.get('answer2Text') as string;
		const answer3Text = formData.get('answer3Text') as string;
		const answer4Text = formData.get('answer4Text') as string;
		const answer5Text = formData.get('answer5Text') as string;
		const answer6Text = formData.get('answer6Text') as string;
		const answer7Text = formData.get('answer7Text') as string;
		const answer8Text = formData.get('answer8Text') as string;

		const question = formData.get('question') as string;
		await gameService.createRound(question, [
			{
				answer: answer1Text,
				value: parseInt(answer1Value)
			},
			{
				answer: answer2Text,
				value: parseInt(answer2Value)
			},
			{
				answer: answer3Text,
				value: parseInt(answer3Value)
			},
			{
				answer: answer4Text,
				value: parseInt(answer4Value)
			},
			{
				answer: answer5Text,
				value: parseInt(answer5Value)
			},
			{
				answer: answer6Text,
				value: parseInt(answer6Value)
			},
			{
				answer: answer7Text,
				value: parseInt(answer7Value)
			},
			{
				answer: answer8Text,
				value: parseInt(answer8Value)
			}
		]);
	}
};
