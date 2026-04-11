import type { Matchup, Team } from '../types/bracket';
import MatchupCard from './MatchupCard';

interface NBAFinalsProps {
  finals: Matchup;
  onPick: (winner: Team) => void;
}

export default function NBAFinals({ finals, onPick }: NBAFinalsProps) {
  return (
    <section className="nba-finals">
      <h2 className="nba-finals-title">🏀 NBA Finals</h2>

      <div className="nba-finals-matchup">
        <MatchupCard
          matchup={finals}
          label="East Champion vs West Champion"
          onPick={onPick}
        />
      </div>

      {finals.winner && (
        <div className="nba-champion-banner">
          <div className="nba-champion-label">NBA Champion</div>
          <div className="nba-champion-name">{finals.winner.name}</div>
          <div className="nba-champion-trophies">🏆🏆🏆</div>
        </div>
      )}
    </section>
  );
}
