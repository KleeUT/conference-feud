export interface User {
	nickname: string;
	name: string;
	picture: string;
	updated_at: string;
	email: string;
	email_verified: boolean;
	iss: string;
	aud: string;
	iat: number;
	exp: number;
	sub: string;
	sid: string;
	'http://localhost:5173/roles': string[];
}
