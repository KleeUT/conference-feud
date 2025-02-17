import { ServerSentEventSender } from '$lib/services/eventSender';
import type { Actions } from './$types';

export const actions: Actions = {
	async default() {
		const sse = ServerSentEventSender.create();
		sse.send({ thing: 'stuff' });
	}
};
