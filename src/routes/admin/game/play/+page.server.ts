import { error } from '@sveltejs/kit';
import { setup } from '../../../context';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const { gameService } = setup(platform);
	const game = await gameService.getGameState();
	if (!game) {
		return error(404, 'Game not found');
	}

	return {
		game
	};
};
