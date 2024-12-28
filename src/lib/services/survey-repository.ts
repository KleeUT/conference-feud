import { join } from 'path';
export class FileBackedSurveyRepository {
	private readonly baseDirectory;
	constructor() {
		this.baseDirectory = join(__dirname, 'data', 'survey-results');
	}
	store() {}
	load() {}
}
