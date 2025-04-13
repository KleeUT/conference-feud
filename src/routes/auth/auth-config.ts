import type { Env } from '../../app';
export type AuthConfig = {
	jwksUrl: string;
	auth0ClientSecret: string;
	auth0ClientId: string;
	publicBaseUrl: string;
	auth0Domain: string;
};
export const authConfig = (env: Env): AuthConfig => ({
	jwksUrl: env.AUTH0_JWKS_URL,
	auth0ClientSecret: env.AUTH0_SECRET,
	auth0ClientId: env.AUTH0_CLIENT_ID,
	publicBaseUrl: env.BASE_URL,
	auth0Domain: env.AUTH0_DOMAIN
});
