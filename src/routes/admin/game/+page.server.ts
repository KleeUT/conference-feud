import { ServerSentEventSender } from '$lib/services/eventSender';
import type { Actions } from './$types';

export const actions: Actions = {
	async default(event) {
		const data = await event.request.formData();
		const eventValue = data.get('eventValue');
		const sse = ServerSentEventSender.create();
		sse.send({ thing: 'stuff', eventValue });
	}
};

type game = {
	teams: Array<{
		name: string;
		score: number;
		active: boolean;
	}>;
	rounds: Array<{
		question: string;
		strikes: [boolean, boolean, boolean];
		answers: Array<{
			text: string;
			score: number;
			exposed: boolean;
		}>;
	}>;
};
