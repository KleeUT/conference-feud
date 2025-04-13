import { redirect, type Cookies } from '@sveltejs/kit';
import { constants } from '../../constants';
import { JwksClient } from 'jwks-rsa';
import type { JwtHeader, SigningKeyCallback } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { authConfig } from '../../auth-config';
import type { User } from '../../user';
import type { Env } from '../../../../app';
let cachedKey: string | undefined = undefined;
export const GET = async ({ cookies, url, platform }) => {
	if (!platform) {
		throw new Error('No Platform');
	}
	const csrfState = cookies.get(constants.csrfStateCookieName);
	const returnUrl = cookies.get(constants.returnToCookieName);

	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	if (state !== csrfState || !code) {
		return new Response('Invalid state', { status: 403 });
	}

	try {
		const token = await getToken({ code, env: platform.env });

		const authUser = (await verifyToken(token.id_token, platform.env)) as User;

		setAuthCookie(cookies, authUser);
		const sessionId = crypto.randomUUID();
		setSessionCookie(cookies, sessionId);
		cookies.delete('csrfState', { path: '/' });
	} catch (err) {
		console.error('Error getting token', err);
		return new Response(`Failed to get token. Err: ${err}`, { status: 500 });
	}
	console.log('Done');
	redirect(307, returnUrl || '/admin');
};

const setSessionCookie = (cookies: Cookies, sessionId: string) => {
	cookies.set(constants.authCookieName, sessionId, {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 3600,
		path: '/'
	});
};
// todo remove
const setAuthCookie = (cookies: Cookies, user: User) => {
	const cookieValue = jwt.sign(user, 'SESSION_SECRET');
	cookies.set(constants.authCookieName, cookieValue, {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 3600,
		path: '/'
	});
};

async function getToken({ code, env }: { code: string; env: Env }) {
	console.log('Fetch path', `https://${authConfig(env).auth0Domain}/oauth/token`);
	const resp = await fetch(`https://${authConfig(env).auth0Domain}/oauth/token`, {
		method: 'POST',
		body: JSON.stringify({
			code,
			client_id: authConfig(env).auth0ClientId,
			client_secret: authConfig(env).auth0ClientSecret,
			redirect_uri: `${authConfig(env).publicBaseUrl}/auth/login/callback`,
			grant_type: 'authorization_code'
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return await resp.json<{
		access_token: string;
		id_token: string;
		scope: string;
		expires_in: number;
		token_type: 'Bearer';
	}>();
}

async function verifyToken<T>(token: string, env: Env): Promise<T> {
	return new Promise((resolve, reject) => {
		jwt.verify(
			token,
			(header: JwtHeader, callback: SigningKeyCallback) => getKey(env, header, callback),
			{},
			(err, payload) => {
				if (err) {
					reject(err);
				} else {
					resolve(payload as T);
				}
			}
		);
	});
}

function getKey(env: Env, header: JwtHeader, callback: SigningKeyCallback) {
	const client = new JwksClient({ jwksUri: authConfig(env).jwksUrl });

	client.getSigningKey(header.kid, function (err, key) {
		if (err) {
			callback(err);
		}
		if (cachedKey) {
			callback(null, cachedKey);
		} else {
			const signingKey = key?.getPublicKey();
			cachedKey = signingKey;
			callback(null, signingKey);
		}
	});
}
