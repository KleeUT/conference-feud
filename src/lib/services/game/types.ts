export interface NewAnswer {
	answer: string;
	value: number;
}

export interface StoredAnswer extends NewAnswer {
	id: string;
	isVisible: boolean;
}

export interface RoundQuestion {
	question: string;
	answers: Array<StoredAnswer>;
}

export type OptionalTeamName = 'team1' | 'team2' | null;

export interface StoredRound extends RoundQuestion {
	id: string;
	isCurrent: boolean;
	isComplete: boolean;
	playOrder: number;
	playingTeam: OptionalTeamName;
	winningTeam: OptionalTeamName;
	wrongGuesses: number;
}

export interface StoredGameState {
	team1Name: string;
	team2Name: string;
	hasStarted: boolean;
	currentRound: number;
	rounds: Array<StoredRound>;
}
