import { json } from '@sveltejs/kit';
import { constants } from '../auth/constants';
import { authConfig } from '../auth/auth-config';

export const GET = async (event) => {
	const platform = event.platform;
	if (!platform) {
		throw new Error('nope');
	}
	return json({
		constants,
		authConfig: authConfig(platform.env)
	});
};
