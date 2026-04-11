import type { Conference, PlayInState, Team } from '../types/bracket';
import MatchupCard from './MatchupCard';

interface PlayInBracketProps {
  conference: Conference;
  playIn: PlayInState;
  onGame1Pick: (winner: Team) => void;
  onGame2Pick: (winner: Team) => void;
  onGame3Pick: (winner: Team) => void;
}

export default function PlayInBracket({
  conference,
  playIn,
  onGame1Pick,
  onGame2Pick,
  onGame3Pick,
}: PlayInBracketProps) {
  const label = conference === 'east' ? 'Eastern' : 'Western';

  const seed7 = playIn.game1.winner;
  const seed8 = playIn.game3.winner;

  return (
    <section className="playin-bracket">
      <h3 className="playin-title">{label} Play-In Tournament</h3>

      <div className="playin-games">
        <div className="playin-game">
          <MatchupCard
            matchup={playIn.game1}
            label="Game 1 · 7 vs 8"
            onPick={onGame1Pick}
          />
          <p className="playin-note">Winner → 7 seed · Loser → Game 3</p>
        </div>

        <div className="playin-game">
          <MatchupCard
            matchup={playIn.game2}
            label="Game 2 · 9 vs 10"
            onPick={onGame2Pick}
          />
          <p className="playin-note">Winner → Game 3 · Loser eliminated</p>
        </div>

        <div className="playin-game playin-game--g3">
          <MatchupCard
            matchup={playIn.game3}
            label="Game 3 · Elimination"
            onPick={onGame3Pick}
          />
          <p className="playin-note">Winner → 8 seed</p>
        </div>
      </div>

      <div className="playin-results">
        <span
          className={`playin-seed-badge${seed7 ? ' playin-seed-badge--set' : ''}`}
        >
          7 seed: {seed7 ? seed7.name : '—'}
        </span>
        <span
          className={`playin-seed-badge${seed8 ? ' playin-seed-badge--set' : ''}`}
        >
          8 seed: {seed8 ? seed8.name : '—'}
        </span>
      </div>
    </section>
  );
}
