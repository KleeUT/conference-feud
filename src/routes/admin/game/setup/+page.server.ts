import { setup } from '../../../context';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { gameService } = setup(event.platform);
	const gameState = await gameService.getGameState();
	return {
		gameState
	};
};
export const actions: Actions = {
	default: async (event) => {
		const { gameService } = setup(event.platform);
		const formData = await event.request.formData();
		const team1Name = formData.get('team1Name')?.toString() ?? '';
		const team2Name = formData.get('team2Name')?.toString() ?? '';
		const gameState = await gameService.setTeamNames(team1Name, team2Name);
		return {
			gameState
		};
	}
};
