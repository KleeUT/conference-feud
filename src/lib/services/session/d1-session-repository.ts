import type { Session } from './session';

export class D1SessionStore {
	private db: D1Database;

	constructor(db: D1Database) {
		this.db = db;
	}

	async getSession(sessionId: string): Promise<Session | null> {
		const result = await this.db
			.prepare('SELECT * FROM SessionStore WHERE session_id = ?')
			.bind(sessionId)
			.first();

		if (!result) {
			return null;
		}

		return {
			userId: result.user_id as string,
			expiresAt: new Date(result.expires_at as number),
			sessionId: result.session_id as string,
			name: result.nam as string
		};
	}

	async storeSession(session: Session): Promise<void> {
		await this.db
			.prepare(
				'INSERT INTO SessionStore (session_id, user_id, expires_at, name) VALUES (?, ?, ?, ?)'
			)
			.bind(session.sessionId, session.userId, session.expiresAt.valueOf(), session.name)
			.run();
	}
}
