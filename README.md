# NBA Playoffs 2026 Bracket Predictor

A clean, interactive bracket predictor for the 2026 NBA Playoffs built with React + TypeScript + Vite.

## Features

- **Play-In Tournament** (both conferences) — pick G1, G2, and G3 winners; 7/8 seeds auto-populate the playoff bracket
- **Full Playoff Bracket** — First Round, Second Round, Conference Finals, NBA Finals
- **Auto-advancement** — picking a winner cascades forward; changing an earlier pick clears invalidated downstream selections
- **Team logos** — PNG logos per team, loaded from `public/logos/`
- **Persistence** — bracket saves to localStorage and restores on refresh
- **Export / Share** — download as JSON or copy a text summary to clipboard
- **Reset** — one-click reset with confirmation

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173/nba-playoffs-2026/](http://localhost:5173/nba-playoffs-2026/)

---

## Adding Team Logos

Drop PNG files into `public/logos/`. Filenames must match the `logo` field in `src/data/teams.ts`.

```
public/
└── logos/
    ├── pistons.png
    ├── celtics.png
    ├── knicks.png
    ├── cavaliers.png
    ├── hawks.png
    ├── raptors.png
    ├── magic.png
    ├── 76ers.png
    ├── hornets.png
    ├── heat.png
    ├── thunder.png
    ├── spurs.png
    ├── nuggets.png
    ├── lakers.png
    ├── rockets.png
    ├── timberwolves.png
    ├── suns.png
    ├── clippers.png
    ├── trailblazers.png
    └── warriors.png
```

To change team names or seedings, edit `src/data/teams.ts` directly and restart the dev server.

---

## Building for Production

```bash
npm run build
npm run preview
```

---

## Deploying to GitHub Pages

1. Create a GitHub repo named `nba-playoffs-2026` (or update `base` in `vite.config.ts` to match your repo name).

2. Run:
   ```bash
   npm run deploy
   ```

3. In your GitHub repo → Settings → Pages, set source to the `gh-pages` branch.

4. App will be live at `https://<your-username>.github.io/nba-playoffs-2026/`

---

## Project Structure

```
src/
├── components/
│   ├── MatchupCard.tsx       — single matchup card, click to pick winner
│   ├── PlayInBracket.tsx     — play-in tournament (G1 / G2 / G3)
│   ├── PlayoffBracket.tsx    — conference rounds (First, Second, Conf Finals)
│   ├── NBAFinals.tsx         — finals matchup + champion banner
│   └── ExportShare.tsx       — JSON download + clipboard share
├── data/
│   ├── teams.ts              — 2026 team seedings and logo paths
│   └── initialState.ts       — builds a fresh BracketState from team data
├── types/
│   └── bracket.ts            — all TypeScript types
├── utils/
│   ├── bracketLogic.ts       — pick winners, cascade clears
│   ├── storage.ts            — localStorage load / save / clear
│   └── export.ts             — JSON export, text summary, clipboard
├── App.tsx                   — root component, all state and event wiring
├── main.tsx                  — React entry point
└── index.css                 — all styles (dark theme, CSS variables)
```

---

## What's Left to Finish

- [ ] Add PNG logo files to `public/logos/`
- [ ] Verify final 2025-26 standings and update `src/data/teams.ts`
- [ ] Visual bracket connectors between rounds
- [ ] Mobile layout improvements
- [ ] Shareable URL (encode state into query params)

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI |
| TypeScript | Type safety |
| Vite | Dev server + bundler |
| gh-pages | GitHub Pages deployment |
| localStorage | Client-side persistence |
| Vanilla CSS | Styling |
