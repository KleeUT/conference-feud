// // src/routes/custom-event/+server.js
// import { produce } from 'sveltekit-sse';
import { newUUID } from '$lib/utils/uuid';
/**
 * @param {number} milliseconds
 * @returns
 */
function delay(milliseconds: number) {
	return new Promise(function run(resolve) {
		setTimeout(resolve, milliseconds);
	});
}
// // let data =
// export function POST() {
// 	console.log('POST');
// 	return produce(async function start({ emit }) {
// 		while (true) {
// 			console.log('Emitting message');
// 			const { error } = emit(
// 				'message',
// 				JSON.stringify({ data: Date.now(), msg: `the time is ${Date.now()}` })
// 			);
// 			if (error) {
// 				return;
// 			}
// 			await delay(1000);
// 		}
// 	});
// }

const streams: Map<string, { stream: TransformStream; writable: WritableStreamDefaultWriter }> =
	new Map();
async function myBackendCode() {
	// other backend code here
	while (true) {
		console.log('Emitting message to ' + streams.size + ' streams');
		await Promise.all(
			streams.values().map(async (stream) => {
				try {
					await stream.writable
						.write(new TextEncoder().encode(`data: ${Date.now()}\n\n`))
						.catch(console.error);
				} catch (e) {
					console.error(e);
				}
			})
		);
		await delay(1000);
	}
}
myBackendCode();
export const GET = () => {
	const stream = new TransformStream();
	const writable = stream.writable.getWriter();
	const id = newUUID();
	streams.set(id, { stream, writable });
	writable.closed.then(() => {
		console.log('Stream closed', id);
		streams.delete(id);
	});
	// stream.readable.getReader().closed.then((e) => {
	// 	console.log('reader closed', e);
	// });
	try {
		const response = new Response(stream.readable, {
			headers: {
				'Content-Type': 'text/event-stream',
				Connection: 'keep-alive',
				'Cache-Control': 'no-cache'
			}
		});
		return response;
	} catch (e) {
		console.error(e);
	}
};
