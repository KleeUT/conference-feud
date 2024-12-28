export class QuestionId {
	constructor(public readonly value: string) {}

	public static areEqual(id1: QuestionId, id2: QuestionId): boolean {
		return id1.value === id2.value;
	}
}
