import type { Conference, ConferenceBracket, Team } from '../types/bracket';
import MatchupCard from './MatchupCard';

interface PlayoffBracketProps {
  conference: Conference;
  bracket: ConferenceBracket;
  onPick: (roundIdx: number, matchupIdx: number, winner: Team) => void;
}

const ROUND_LABELS = ['First Round', 'Second Round', 'Conf Finals'];

const MATCHUP_LABELS: Record<number, Record<number, string>> = {
  0: {
    0: '1 vs 8',
    1: '2 vs 7',
    2: '3 vs 6',
    3: '4 vs 5',
  },
  1: {
    0: 'W(1/8) vs W(4/5)',
    1: 'W(2/7) vs W(3/6)',
  },
  2: {
    0: 'Conference Finals',
  },
};

export default function PlayoffBracket({
  conference,
  bracket,
  onPick,
}: PlayoffBracketProps) {
  const label = conference === 'east' ? 'Eastern' : 'Western';
  const champion = bracket.rounds[2][0].winner;

  return (
    <section className="playoff-bracket">
      <h3 className="playoff-bracket-title">{label} Conference Bracket</h3>

      <div className="playoff-rounds">
        {bracket.rounds.map((round, ri) => (
          <div key={ri} className="playoff-round">
            <div className="playoff-round-label">{ROUND_LABELS[ri]}</div>
            <div className="playoff-round-matchups">
              {round.map((matchup, mi) => (
                <MatchupCard
                  key={mi}
                  matchup={matchup}
                  label={MATCHUP_LABELS[ri]?.[mi]}
                  onPick={(winner) => onPick(ri, mi, winner)}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Conference champion callout */}
        <div className="playoff-round playoff-round--champion">
          <div className="playoff-round-label">Champion</div>
          <div
            className={`conf-champion${champion ? ' conf-champion--set' : ''}`}
          >
            {champion ? (
              <>
                <span className="conf-champion-trophy">🏆</span>
                <span>{champion.name}</span>
              </>
            ) : (
              <span className="conf-champion-tbd">—</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
