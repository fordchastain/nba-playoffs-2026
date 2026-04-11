import { useState } from 'react';
import type { BracketState } from '../types/bracket';
import {
  buildSummaryText,
  copyToClipboard,
  downloadJSON,
} from '../utils/export';

interface ExportShareProps {
  state: BracketState;
}

export default function ExportShare({ state }: ExportShareProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleCopy() {
    const text = buildSummaryText(state);
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const summary = buildSummaryText(state);

  return (
    <div className="export-share">
      <button className="export-toggle" onClick={() => setOpen((o) => !o)}>
        {open ? '▼' : '▶'} Export / Share
      </button>

      {open && (
        <div className="export-panel">
          <div className="export-actions">
            <button
              className="btn btn-primary"
              onClick={() => downloadJSON(state)}
            >
              ⬇ Download JSON
            </button>
            <button className="btn btn-secondary" onClick={handleCopy}>
              {copied ? '✓ Copied!' : '📋 Copy Summary'}
            </button>
          </div>

          <pre className="export-preview">{summary}</pre>
        </div>
      )}
    </div>
  );
}
