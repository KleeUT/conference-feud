DROP TABLE Round;
DROP TABLE Answer;
DROP TABLE Game;
CREATE TABLE IF NOT EXISTS Round (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  isCurrent INTEGER NOT NULL,
  isComplete INTEGER NOT NULL,
  playOrder INTEGER NOT NULL,
  playingTeam TEXT,
  winningTeam TEXT,
  wrongGuesses INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS Answer(
  id: TEXT PRIMARY KEY,
  roundId TEXT,
  answer TEXT ,
  value NUMBER ,
  isVisible INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS Game(
  team1Name TEXT NOT NULL,
  team2Name TEXT NOT NULL,
  hasStarted INTEGER NOT NULL,
  currentRound INTEGER
);


INSERT INTO Game (team1Name, team2Name, hasStarted, currentRound) VALUES ('Team 1', 'Team 2', 0, 0);