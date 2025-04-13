import { D1SessionStore } from './d1-session-repository';
import type { Session } from './session';

export class SessionService {
	constructor(private readonly sessionStore: D1SessionStore) {}
	async isSessionValid(sessionId?: string): Promise<Session | false> {
		if (!sessionId) {
			return false;
		}
		const session = await this.sessionStore.getSession(sessionId);
		const now = new Date();
		if (!session || session.expiresAt < now) {
			return false;
		}
		return session;
	}

	async storeSession(session: Omit<Session, 'expiresAt'>): Promise<void> {
		await this.sessionStore.storeSession({
			...session,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
		});
	}
}
