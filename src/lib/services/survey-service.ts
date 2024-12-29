import type { FileBackedQuestionRepository } from './question-repository';
import type { FileBackedSurveyRepository } from './survey-repository';

export class SurveyService {
	constructor(
		private readonly surveyRepository: FileBackedSurveyRepository,
		private readonly questionRepository: FileBackedQuestionRepository
	) {}
	// loadForId(surveyId: string) {

	// }
}
