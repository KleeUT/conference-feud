import { json } from '@sveltejs/kit';
import { constants } from '../auth/constants';
import { authConfig } from '../auth/auth-config';

export const GET = async (event) => {
	const platform = event.platform;
	if (!platform) {
		throw new Error('nope');
	}
	const auth = { ...authConfig(platform.env) };
	auth.auth0ClientSecret = `${auth.auth0ClientSecret.slice(0, 1)} ${auth.auth0ClientSecret.length - 2} ${auth.auth0ClientSecret.slice(-1)}`;
	return json({
		constants,
		authConfig: auth
	});
};
