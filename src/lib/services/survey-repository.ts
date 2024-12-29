import { join } from 'path';
export class FileBackedSurveyRepository {
	private readonly baseDirectory;
	constructor() {
		this.baseDirectory = join(process.cwd(), 'data', 'survey-results');
	}
	store() {}
	load() {}
}
