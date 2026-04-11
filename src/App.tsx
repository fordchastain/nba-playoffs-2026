import { useEffect, useState } from 'react';

import ExportShare from './components/ExportShare';
import NBAFinals from './components/NBAFinals';
import PlayInBracket from './components/PlayInBracket';
import PlayoffBracket from './components/PlayoffBracket';

import { buildInitialState } from './data/initialState';
import type { BracketState, Team } from './types/bracket';
import {
  updateFinals,
  updatePlayIn,
  updatePlayInGame3,
  updatePlayoff,
} from './utils/bracketLogic';
import { clearBracket, loadBracket, saveBracket } from './utils/storage';

function App() {
  const [state, setState] = useState<BracketState>(() => {
    return loadBracket() ?? buildInitialState();
  });

  useEffect(() => {
    saveBracket(state);
  }, [state]);

  function handlePlayInPick(
    conf: 'east' | 'west',
    game: 'game1' | 'game2',
    winner: Team
  ) {
    setState((s) => updatePlayIn(s, conf, game, winner));
  }

  function handlePlayInGame3Pick(conf: 'east' | 'west', winner: Team) {
    setState((s) => updatePlayInGame3(s, conf, winner));
  }

  function handlePlayoffPick(
    conf: 'east' | 'west',
    roundIdx: number,
    matchupIdx: number,
    winner: Team
  ) {
    setState((s) => updatePlayoff(s, conf, roundIdx, matchupIdx, winner));
  }

  function handleFinalsPick(winner: Team) {
    setState((s) => updateFinals(s, winner));
  }

  function handleReset() {
    const confirmed = window.confirm('Reset all bracket picks?');
    if (!confirmed) return;
    clearBracket();
    setState(buildInitialState());
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <h1 className="app-title">🏀 NBA Playoffs 2026</h1>
          <button className="btn btn-danger" onClick={handleReset}>
            Reset Bracket
          </button>
        </div>
      </header>

      <main className="bracket-layout">
        <div className="conference-section conference-section--east">
          <h2 className="conference-heading">Eastern Conference</h2>

          <PlayInBracket
            conference="east"
            playIn={state.east.playIn}
            onGame1Pick={(w) => handlePlayInPick('east', 'game1', w)}
            onGame2Pick={(w) => handlePlayInPick('east', 'game2', w)}
            onGame3Pick={(w) => handlePlayInGame3Pick('east', w)}
          />

          <PlayoffBracket
            conference="east"
            bracket={state.east}
            onPick={(ri, mi, w) => handlePlayoffPick('east', ri, mi, w)}
          />
        </div>

        <div className="finals-column">
          <NBAFinals finals={state.finals} onPick={handleFinalsPick} />
        </div>

        <div className="conference-section conference-section--west">
          <h2 className="conference-heading">Western Conference</h2>

          <PlayInBracket
            conference="west"
            playIn={state.west.playIn}
            onGame1Pick={(w) => handlePlayInPick('west', 'game1', w)}
            onGame2Pick={(w) => handlePlayInPick('west', 'game2', w)}
            onGame3Pick={(w) => handlePlayInGame3Pick('west', w)}
          />

          <PlayoffBracket
            conference="west"
            bracket={state.west}
            onPick={(ri, mi, w) => handlePlayoffPick('west', ri, mi, w)}
          />
        </div>
      </main>

      <div className="app-section">
        <ExportShare state={state} />
      </div>

      <footer className="app-footer">
        NBA Playoffs 2026 Bracket Predictor
      </footer>
    </div>
  );
}

export default App;
