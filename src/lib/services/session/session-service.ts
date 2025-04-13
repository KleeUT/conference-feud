import { D1SessionStore } from './d1-session-repository';
import type { Session } from './session';

export class SessionService {
	constructor(private readonly sessionStore: D1SessionStore) {}
	async isSessionValid(sessionId: string): Promise<boolean> {
		const session = await this.sessionStore.getSession(sessionId);
		if (!session) {
			return false;
		}
		const now = new Date();
		return session.expiresAt > now;
	}
	async storeSession(session: Omit<Session, 'expiresAt'>): Promise<void> {
		await this.sessionStore.storeSession({
			...session,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
		});
	}
}
