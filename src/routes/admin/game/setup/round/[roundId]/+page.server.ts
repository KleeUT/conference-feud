import { setup } from '../../../../../context';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, platform }) => {
	const { gameService } = setup(platform);
	const round = await gameService.getRound(params.roundId);
	if (!round) {
		throw new Error('Round not found');
	}
	round.answers.sort((a, b) => b.value - a.value);
	return {
		question: round.question,
		answers: {
			answer1: round.answers[0],
			answer2: round.answers[1],
			answer3: round.answers[2],
			answer4: round.answers[3],
			answer5: round.answers[4],
			answer6: round.answers[5],
			answer7: round.answers[6],
			answer8: round.answers[7]
		}
	};
};

export const actions: Actions = {
	default: async ({ request, platform, params }) => {
		const { gameService } = setup(platform);
		const formData = await request.formData();
		const answer1Id = formData.get('answer1Id') as string;
		const answer2Id = formData.get('answer2Id') as string;
		const answer3Id = formData.get('answer3Id') as string;
		const answer4Id = formData.get('answer4Id') as string;
		const answer5Id = formData.get('answer5Id') as string;
		const answer6Id = formData.get('answer6Id') as string;
		const answer7Id = formData.get('answer7Id') as string;
		const answer8Id = formData.get('answer8Id') as string;
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
		await gameService.updateRound(params.roundId, question, [
			{
				id: answer1Id,
				answer: answer1Text,
				value: parseInt(answer1Value),
				isVisible: false
			},
			{
				id: answer2Id,
				answer: answer2Text,
				value: parseInt(answer2Value),
				isVisible: false
			},
			{
				id: answer3Id,
				answer: answer3Text,
				value: parseInt(answer3Value),
				isVisible: false
			},
			{
				id: answer4Id,
				answer: answer4Text,
				value: parseInt(answer4Value),
				isVisible: false
			},
			{
				id: answer5Id,
				answer: answer5Text,
				value: parseInt(answer5Value),
				isVisible: false
			},
			{
				id: answer6Id,
				answer: answer6Text,
				value: parseInt(answer6Value),
				isVisible: false
			},
			{
				id: answer7Id,
				answer: answer7Text,
				value: parseInt(answer7Value),
				isVisible: false
			},
			{
				id: answer8Id,
				answer: answer8Text,
				value: parseInt(answer8Value),
				isVisible: false
			}
		]);
	}
};
