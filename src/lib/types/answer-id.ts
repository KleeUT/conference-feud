export class AnswerId {
	constructor(private readonly str: string) {}
	equals(questionId: AnswerId): boolean {
		return questionId.str === this.str;
	}
	get value() {
		return this.str;
	}
}
