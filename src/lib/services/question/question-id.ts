export class QuestionId {
	constructor(public readonly value: string) {}
	toJSON() {
		return { value: this.value };
	}
	public static fromJson(json: { value: string }) {
		return new QuestionId(json.value);
	}
	public equals(id: QuestionId): boolean {
		return id.value === this.value;
	}
	public static areEqual(id1: QuestionId, id2: QuestionId): boolean {
		return id1.value === id2.value;
	}
}
