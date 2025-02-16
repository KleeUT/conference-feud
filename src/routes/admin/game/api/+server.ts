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

const streams: Map<string, { stream: TransformStream; writable: WritableStreamDefaultWriter }> =
	new Map();
async function myBackendCode() {
	// other backend code here
	while (true) {
		console.log('Emitting message to ' + streams.size + ' streams');
		await Promise.all(
			streams.keys().map(async (key) => {
				try {
					console.log('About to write');
					const stream = streams.get(key);
					if (!stream) {
						return;
					}
					await stream.writable
						.write(new TextEncoder().encode(`data: ${Date.now()}\n\n`))
						.catch((e) => {
							console.error('Couldnt write to stream ' + key, e);
							streams.delete(key);
						});
					console.log('Wrote');
				} catch (e) {
					console.error('Couldnt write to stream ' + key, e);
					streams.delete(key);
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
	writable.closed
		.then(() => {
			console.log('Stream closed', id);
			streams.delete(id);
		})
		.catch((e) => console.error('64', e));
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
		console.error('79', e);
	}
};
