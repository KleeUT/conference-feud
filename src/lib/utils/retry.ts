export async function retry<t>(action: () => t, count: number = 1): Promise<t> {
	try {
		return action();
	} catch (e) {
		console.error({ e, retryCount: count });
		if (count > 0) {
			return await new Promise((resolve) => {
				setTimeout(() => resolve(retry(action, count - 1)), Math.floor(Math.random() * 200));
			});
		}
		throw e;
	}
}
