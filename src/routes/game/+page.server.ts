import { setup } from '../context';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const { gameService } = setup(platform);
	const game = await gameService.getGameState();
	return {
		game
	};
};
