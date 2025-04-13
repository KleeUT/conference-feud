import { redirect } from '@sveltejs/kit';
import { randomUUID } from 'crypto';
import { constants } from '../constants';
import { authConfig } from '../auth-config';

export const GET = async ({ cookies, url, platform }) => {
	if (!platform) {
		throw new Error('No Platform');
	}
	const csrfState = randomUUID();
	cookies.set(constants.csrfStateCookieName, csrfState, {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 1000,
		path: '/'
	});
	const returnUrl = url.searchParams.get('returnUrl') || '/';
	cookies.set(constants.returnToCookieName, returnUrl, {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 1000,
		path: '/'
	});
	const query = {
		scope: 'openid profile email',
		response_type: 'code',
		client_id: authConfig(platform.env).auth0ClientId,
		redirect_uri: `${authConfig(platform.env).publicBaseUrl}/auth/login/callback`,
		state: csrfState
	};

	redirect(
		302,
		`https://${authConfig(platform.env).auth0Domain}/authorize?${new URLSearchParams(query).toString()}`
	);
	// return new Response(null, {
	// 	status: 302,
	// 	headers: {
	// 		location: `https://${AUTH0_DOMAIN}/authorize?${new URLSearchParams(query).toString()}`
	// 	}
	// });
};
