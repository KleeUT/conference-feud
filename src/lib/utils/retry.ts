export function retry<t>(action: () => t, count: number = 1): t {
	try {
		return action();
	} catch (e) {
		console.error({ e, retryCount: count });
		if (count > 0) {
			return retry(action, count - 1);
		}
		throw e;
	}
}
