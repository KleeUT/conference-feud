import type { Env } from '../../app';

export const authConfig = (env: Env) => ({
	jwksUrl: env.AUTH0_JWKS_URL,
	auth0ClientSecret: env.AUTH0_SECRET,
	auth0ClientId: env.AUTH0_CLIENT_ID,
	publicBaseUrl: env.BASE_URL,
	auth0Domain: env.AUTH0_DOMAIN
});
