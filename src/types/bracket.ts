export type Conference = 'east' | 'west';

export interface Team {
  id: string;
  name: string;
  seed: number;
  conference: Conference;
  logo: string;
}

export interface Matchup {
  teamA: Team | null;
  teamB: Team | null;
  winner: Team | null;
}

export type PlayoffRounds = [Matchup[], Matchup[], Matchup[]];

export interface ConferenceBracket {
  conference: Conference;
  rounds: PlayoffRounds;
}

export interface BracketState {
  eastTeams: Team[];
  westTeams: Team[];
  east: ConferenceBracket;
  west: ConferenceBracket;
  finals: Matchup;
}
