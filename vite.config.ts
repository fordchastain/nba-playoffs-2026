import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set base to '/nba-playoffs-2026/' for GitHub Pages deployment.
// Change 'nba-playoffs-2026' to match your GitHub repo name.
export default defineConfig({
  plugins: [react()],
  base: '/nba-playoffs-2026/',
});
