import type {
  BracketState,
  ConferenceBracket,
  Conference,
  Matchup,
  Team,
} from "../types/bracket";

const cloneMatchup = (m: Matchup): Matchup => ({
  teamA: m.teamA,
  teamB: m.teamB,
  winner: m.winner,
});

function setTeamInMatchup(
  m: Matchup,
  slot: "teamA" | "teamB",
  team: Team | null,
): Matchup {
  const updated = { ...m, [slot]: team };
  if (
    updated.winner &&
    updated.winner.id !== updated.teamA?.id &&
    updated.winner.id !== updated.teamB?.id
  ) {
    updated.winner = null;
  }
  return updated;
}

const R1_TO_R2: Record<
  number,
  { matchupIdx: number; slot: "teamA" | "teamB" }
> = {
  0: { matchupIdx: 0, slot: "teamA" }, // 1v8 winner → R2 matchup 0
  1: { matchupIdx: 0, slot: "teamB" }, // 4v5 winner → R2 matchup 0
  2: { matchupIdx: 1, slot: "teamA" }, // 2v7 winner → R2 matchup 1
  3: { matchupIdx: 1, slot: "teamB" }, // 3v6 winner → R2 matchup 1
};

export function pickPlayoffWinner(
  conf: ConferenceBracket,
  roundIdx: number,
  matchupIdx: number,
  winner: Team,
): ConferenceBracket {
  const rounds = conf.rounds.map((round) =>
    round.map(cloneMatchup),
  ) as ConferenceBracket["rounds"];

  rounds[roundIdx][matchupIdx] = { ...rounds[roundIdx][matchupIdx], winner };

  if (roundIdx === 0) {
    const { matchupIdx: nextIdx, slot } = R1_TO_R2[matchupIdx];
    rounds[1][nextIdx] = setTeamInMatchup(rounds[1][nextIdx], slot, winner);

    const r2Winner = rounds[1][nextIdx].winner;
    const cfSlot: "teamA" | "teamB" = nextIdx === 0 ? "teamA" : "teamB";
    if (!r2Winner) {
      rounds[2][0] = setTeamInMatchup(rounds[2][0], cfSlot, null);
    } else {
      rounds[2][0] = setTeamInMatchup(rounds[2][0], cfSlot, r2Winner);
    }
  } else if (roundIdx === 1) {
    const cfSlot: "teamA" | "teamB" = matchupIdx === 0 ? "teamA" : "teamB";
    rounds[2][0] = setTeamInMatchup(rounds[2][0], cfSlot, winner);
  }

  return { ...conf, rounds };
}

export function syncFinals(state: BracketState): BracketState {
  const eastChamp = state.east.rounds[2][0].winner;
  const westChamp = state.west.rounds[2][0].winner;

  let finals: Matchup = {
    teamA: eastChamp ?? null,
    teamB: westChamp ?? null,
    winner: state.finals.winner,
  };

  if (
    finals.winner &&
    finals.winner.id !== finals.teamA?.id &&
    finals.winner.id !== finals.teamB?.id
  ) {
    finals = { ...finals, winner: null };
  }

  return { ...state, finals };
}

export function updatePlayoff(
  state: BracketState,
  conf: Conference,
  roundIdx: number,
  matchupIdx: number,
  winner: Team,
): BracketState {
  const key = conf === "east" ? "east" : "west";
  const updatedConf = pickPlayoffWinner(
    state[key],
    roundIdx,
    matchupIdx,
    winner,
  );
  return syncFinals({ ...state, [key]: updatedConf });
}

export function updateFinals(state: BracketState, winner: Team): BracketState {
  return { ...state, finals: { ...state.finals, winner } };
}
