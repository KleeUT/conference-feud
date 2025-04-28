import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		teams: {
			team1: {
				name: 'Team 1'
			},
			team2: {
				name: 'Team 2'
			}
		},
		questions: [
			{
				questionId: 'question1_id',
				question: 'is a hotdog a sandwich?'
			},
			{
				questionId: 'question2_id',
				question: 'is a taco a sandwich?'
			},
			{
				questionId: 'question3_id',
				question: 'is a burger a sandwich?'
			}
		]
	};
};
