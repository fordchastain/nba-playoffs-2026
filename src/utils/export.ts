import type { BracketState } from '../types/bracket';

export function exportAsJSON(state: BracketState): string {
  return JSON.stringify(state, null, 2);
}

export function downloadJSON(state: BracketState): void {
  const blob = new Blob([exportAsJSON(state)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nba-2026-bracket.json';
  a.click();
  URL.revokeObjectURL(url);
}

export function buildSummaryText(state: BracketState): string {
  const lines: string[] = ['NBA Playoffs 2026 — My Bracket', ''];

  const confLabel = (c: 'east' | 'west') =>
    c === 'east' ? 'Eastern' : 'Western';

  for (const c of ['east', 'west'] as const) {
    const conf = state[c];
    lines.push(`── ${confLabel(c)} Conference ──`);

    const pi = conf.playIn;
    lines.push('Play-In:');
    if (pi.game1.winner)
      lines.push(`  G1 Winner (7 seed): ${pi.game1.winner.name}`);
    if (pi.game3.winner)
      lines.push(`  G3 Winner (8 seed): ${pi.game3.winner.name}`);

    const roundLabels = ['First Round', 'Second Round', 'Conf Finals'];
    conf.rounds.forEach((round, ri) => {
      lines.push(`${roundLabels[ri]}:`);
      round.forEach((m) => {
        if (m.winner) {
          lines.push(
            `  ${m.teamA?.name ?? 'TBD'} vs ${m.teamB?.name ?? 'TBD'} → ${m.winner.name}`
          );
        }
      });
    });

    const confChamp = conf.rounds[2][0].winner;
    if (confChamp) lines.push(`${confLabel(c)} Champion: ${confChamp.name}`);
    lines.push('');
  }

  lines.push('── NBA Finals ──');
  const finalsA = state.finals.teamA?.name ?? 'TBD';
  const finalsB = state.finals.teamB?.name ?? 'TBD';
  lines.push(`${finalsA} vs ${finalsB}`);
  if (state.finals.winner) {
    lines.push('');
    lines.push(`NBA CHAMPION: ${state.finals.winner.name}`);
  }

  return lines.join('\n');
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
