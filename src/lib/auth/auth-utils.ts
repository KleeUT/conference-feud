import type { Session, SessionService } from '$lib/services/session';
import { redirect } from '@sveltejs/kit';

export async function mustBeLoggedIn(
	sessionService: SessionService,
	sessionId: string | undefined
): Promise<Session> {
	const session = await sessionService.isSessionValid(sessionId);
	if (!session) {
		console.log('Not logged in redirecting to admin');
		redirect(307, '/admin');
	}
	return session;
}
