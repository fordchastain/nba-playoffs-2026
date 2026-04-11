import type { Matchup, Team } from '../types/bracket';

interface MatchupCardProps {
  matchup: Matchup;
  label?: string;
  pickable?: boolean;
  onPick?: (winner: Team) => void;
  compact?: boolean;
}

export default function MatchupCard({
  matchup,
  label,
  pickable = true,
  onPick,
  compact = false,
}: MatchupCardProps) {
  const { teamA, teamB, winner } = matchup;

  function handlePick(team: Team | null) {
    if (!pickable || !team || !onPick) return;
    if (!teamA || !teamB) return;
    onPick(team);
  }

  const canPick = pickable && !!teamA && !!teamB;

  return (
    <div className={`matchup-card${compact ? ' matchup-card--compact' : ''}`}>
      {label && <div className="matchup-label">{label}</div>}
      <TeamSlot
        team={teamA}
        isWinner={!!winner && winner.id === teamA?.id}
        isLoser={!!winner && winner.id !== teamA?.id}
        canPick={canPick}
        onPick={() => handlePick(teamA)}
      />
      <div className="matchup-vs">vs</div>
      <TeamSlot
        team={teamB}
        isWinner={!!winner && winner.id === teamB?.id}
        isLoser={!!winner && winner.id !== teamB?.id}
        canPick={canPick}
        onPick={() => handlePick(teamB)}
      />
    </div>
  );
}

interface TeamSlotProps {
  team: Team | null;
  isWinner: boolean;
  isLoser: boolean;
  canPick: boolean;
  onPick: () => void;
}

function TeamSlot({ team, isWinner, isLoser, canPick, onPick }: TeamSlotProps) {
  const classes = [
    'team-slot',
    isWinner ? 'team-slot--winner' : '',
    isLoser ? 'team-slot--loser' : '',
    canPick && team ? 'team-slot--pickable' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      onClick={onPick}
      disabled={!canPick || !team}
      title={canPick && team ? `Pick ${team.name}` : undefined}
    >
      {team ? (
        <>
          <span className="team-seed">{team.seed}</span>
          <img
            className="team-logo"
            src={`${import.meta.env.BASE_URL}${team.logo}`}
            alt={team.name}
            width={20}
            height={20}
          />
          <span className="team-name">{team.name}</span>
        </>
      ) : (
        <span className="team-tbd">TBD</span>
      )}
    </button>
  );
}
