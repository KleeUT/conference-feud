export class SurveyId {
	constructor(public readonly value: string) {}
	toJSON() {
		return { value: this.value };
	}
	public static fromJson(json: { value: string }) {
		return new SurveyId(json.value);
	}
	public equals(id: SurveyId): boolean {
		return id.value === this.value;
	}
	public static areEqual(id1: SurveyId, id2: SurveyId): boolean {
		return id1.value === id2.value;
	}
}
