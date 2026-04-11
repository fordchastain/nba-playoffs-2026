import type { BracketState } from '../types/bracket';

const STORAGE_KEY = 'nba-playoffs-2026-bracket-v2';

export function saveBracket(state: BracketState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    console.warn('Failed to save bracket to localStorage');
  }
}

export function loadBracket(): BracketState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BracketState;
  } catch {
    console.warn('Failed to load bracket from localStorage');
    return null;
  }
}

export function clearBracket(): void {
  localStorage.removeItem(STORAGE_KEY);
}
