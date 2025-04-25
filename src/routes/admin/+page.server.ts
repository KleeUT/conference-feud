import { constants } from '../auth/constants';
import { setup } from '../context';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { validateSession } = setup(event.platform);

	const sessionId = event.cookies.get(constants.sessionId);

	let sessionValid = false;
	if (sessionId) {
		try {
			await validateSession(event.cookies);
			sessionValid = true;
		} catch (e) {
			// if the session is not valid it will throw a redirect
			console.log("couldn't validate session", e);
		}
	}
	return { sessionId, sessionValid };
};
