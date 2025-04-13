import { redirect, type Cookies } from '@sveltejs/kit';
import { constants } from '../../constants';

import { authConfig } from '../../auth-config';
import type { Env } from '../../../../app';
import { newUUID } from '$lib/utils/uuid';

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
		console.log('Token', token);
		const sessionId = newUUID();
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
