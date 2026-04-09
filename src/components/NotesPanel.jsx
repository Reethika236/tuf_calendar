import { useState, useEffect } from "react";
import { MONTH_NAMES, formatRange } from "../utils/calendarHelpers";

export default function NotesPanel({ year, month, startDate, endDate, notes, onSaveNote }) {
  const key = `wall-cal-note-${year}-${month}`;
  const [input, setInput] = useState(notes[key] || "");

  useEffect(() => {
    setInput(notes[key] || "");
  }, [key, notes]);

  return (
    <div className="card shadow-sm border-0 notes-card h-100">
      <div className="card-body d-flex flex-column gap-3">

        <div>
          <h6 className="fw-semibold mb-1 notes-title">📝 Notes</h6>
          <p className="text-secondary mb-0 notes-month-label">
            {MONTH_NAMES[month]} {year}
          </p>
        </div>

        <div className="range-badge rounded px-2 py-1">
          <small className="text-secondary d-block" style={{ fontSize: "11px" }}>
            SELECTED RANGE
          </small>
          <strong className="range-text">{formatRange(startDate, endDate)}</strong>
        </div>

        <div className="flex-grow-1 d-flex flex-column gap-2">
          <label htmlFor="note-input" className="form-label mb-0 fw-medium notes-label">
            Month notes
          </label>
          <textarea
            id="note-input"
            className="form-control notes-textarea flex-grow-1"
            rows={6}
            placeholder={`Jot something down for ${MONTH_NAMES[month]}…`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="btn btn-primary btn-sm w-100"
            onClick={() => onSaveNote(key, input.trim())}
          >
            Save note
          </button>
          {notes[key] && (
            <p className="text-success mb-0 saved-label">✓ Saved</p>
          )}
        </div>

      </div>
    </div>
  );
}
