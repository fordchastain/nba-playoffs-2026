import type {
  BracketState,
  ConferenceBracket,
  Matchup,
  Team,
} from '../types/bracket';
import { EAST_TEAMS, WEST_TEAMS } from './teams';

const emptyMatchup = (): Matchup => ({
  teamA: null,
  teamB: null,
  winner: null,
});

function buildConference(teams: Team[]): ConferenceBracket {
  const s = (n: number) => teams[n - 1];

  const rounds: ConferenceBracket['rounds'] = [
    [
      { teamA: s(1), teamB: s(8), winner: null },
      { teamA: s(4), teamB: s(5), winner: null },
      { teamA: s(2), teamB: s(7), winner: null },
      { teamA: s(3), teamB: s(6), winner: null },
    ],
    [emptyMatchup(), emptyMatchup()],
    [emptyMatchup()],
  ];

  return {
    conference: teams[0].conference,
    rounds,
  };
}

export function buildInitialState(
  eastTeams: Team[] = EAST_TEAMS,
  westTeams: Team[] = WEST_TEAMS
): BracketState {
  return {
    eastTeams,
    westTeams,
    east: buildConference(eastTeams),
    west: buildConference(westTeams),
    finals: emptyMatchup(),
  };
}

export { buildConference };
