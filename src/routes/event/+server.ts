import { ServerSentEventSender } from '$lib/services/eventSender';

export const GET = () => {
	const sender = ServerSentEventSender.create();
	const response = sender.setUpResponse();
	return response;
};
