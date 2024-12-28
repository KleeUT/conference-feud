export class CouldBeAnError<T> {
	private constructor(
		private readonly err?: Error,
		private readonly val?: T
	) {}
	get isError(): boolean {
		return !!this.err;
	}
	get error(): Error {
		if (!this.err) {
			throw new Error('Accessing error when there is none');
		}
		return this.err;
	}
	get value(): T {
		if (!this.val) {
			throw new Error('Accessing value when there is none');
		}
		return this.val;
	}
	public static withError<T>(e: Error): CouldBeAnError<T> {
		return new CouldBeAnError(e);
	}
	public static withValue<T>(e: T): CouldBeAnError<T> {
		return new CouldBeAnError(undefined, e);
	}
	public static withNoValue(): CouldBeAnError<never> {
		return new CouldBeAnError<never>(undefined, undefined);
	}
}
