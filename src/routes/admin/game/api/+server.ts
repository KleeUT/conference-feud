// src/routes/custom-event/+server.js
import { produce } from 'sveltekit-sse';

/**
 * @param {number} milliseconds
 * @returns
 */
function delay(milliseconds: number) {
	return new Promise(function run(resolve) {
		setTimeout(resolve, milliseconds);
	});
}
// let data =
export function POST() {
	console.log('POST');
	return produce(async function start({ emit }) {
		while (true) {
			console.log('Emitting message');
			const { error } = emit(
				'message',
				JSON.stringify({ data: Date.now(), msg: `the time is ${Date.now()}` })
			);
			if (error) {
				return;
			}
			await delay(1000);
		}
	});
}
