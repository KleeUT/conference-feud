import { newUUID } from '$lib/utils/uuid';

let instance: ServerSentEventSender | undefined;
export class ServerSentEventSender {
	private streams: Map<string, { stream: TransformStream; writable: WritableStreamDefaultWriter }> =
		new Map();
	private constructor() {
		this.streams = new Map();
	}
	public static create(): ServerSentEventSender {
		if (!instance) {
			instance = new ServerSentEventSender();
		}
		return instance;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async send(data: any) {
		console.log('Emitting message to ' + this.streams.size + ' streams');
		await Promise.all(
			this.streams.keys().map(async (key) => {
				try {
					const stream = this.streams.get(key);
					if (!stream) {
						return;
					}
					await stream.writable
						.write(new TextEncoder().encode(JSON.stringify({ ...data })))
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						.catch((_) => {
							// stream errored
							this.streams.delete(key);
						});

					// eslint-disable-next-line @typescript-eslint/no-unused-vars
				} catch (e) {
					// stream errored
					this.streams.delete(key);
				}
			})
		);
	}
	setUpResponse(): Response {
		console.log('Setting up response');
		const stream = new TransformStream();
		const writable = stream.writable.getWriter();
		const id = newUUID();
		this.streams.set(id, { stream, writable });
		writable.closed
			.then(() => {
				// stream closed
				this.streams.delete(id);
			})
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.catch((e) => {
				// stream errored
				this.streams.delete(id);
			});
		console.log('Response set up');
		const response = new Response(stream.readable, {
			headers: {
				'Content-Type': 'text/event-stream',
				Connection: 'keep-alive',
				'Cache-Control': 'no-cache'
			}
		});
		return response;
	}
}
