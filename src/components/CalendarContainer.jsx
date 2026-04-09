import { useState, useEffect, useCallback } from "react";
import {
  MONTH_NAMES, getHeroImage,
  isSameDay, formatRange, noteKey,
} from "../utils/calendarHelpers";
import Header       from "./Header";
import CalendarGrid from "./CalendarGrid";
import NotesPanel   from "./NotesPanel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/calendar.css";

export default function CalendarContainer() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [startDate, setStartDate] = useState(null);
  const [endDate,   setEndDate]   = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wall-cal-notes") || "{}"); }
    catch { return {}; }
  });

  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    localStorage.setItem("wall-cal-notes", JSON.stringify(notes));
  }, [notes]);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDaySelect = useCallback((date) => {
    date.setHours(0, 0, 0, 0);

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      return;
    }

    if (isSameDay(date, startDate)) {
      setEndDate(date);
    } else if (date < startDate) {
      setEndDate(startDate);
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  }, [startDate, endDate]);

  const handleSaveNote = useCallback((key, text) => {
    setNotes((prev) => ({ ...prev, [key]: text }));
  }, []);

  return (
    <div className="wall-calendar-wrapper">
      <div className="container-fluid">
        <div className="row g-3 align-items-stretch">

          {/* ── LEFT: Hero Panel ── */}
          <div className="col-12 col-md-4 col-lg-3">
            <div className="hero-panel h-100">
              <img
                src={getHeroImage(month)}
                alt={`${MONTH_NAMES[month]} scenery`}
                className="hero-img"
              />
              <div className="hero-body">
                <p className="hero-year">{year}</p>
                <h2 className="hero-month-name">{MONTH_NAMES[month]}</h2>
                <p className="hero-tagline">Wall Calendar</p>
              </div>
            </div>
          </div>

          {/* ── CENTER: Calendar ── */}
          <div className="col-12 col-md-8 col-lg-6">
            <div className="calendar-card h-100 d-flex flex-column gap-3">
              <Header
                month={month}
                year={year}
                onPrev={prevMonth}
                onNext={nextMonth}
              />
              <CalendarGrid
                year={year}
                month={month}
                startDate={startDate}
                endDate={endDate}
                hoverDate={hoverDate}
                today={today}
                onSelect={handleDaySelect}
                onHover={setHoverDate}
              />

              {/* Summary bar */}
              <div className="summary-bar">
                <span>🗓</span>
                <span>{formatRange(startDate, endDate)}</span>
                {(startDate || endDate) && (
                  <button
                    className="clear-btn"
                    onClick={() => { setStartDate(null); setEndDate(null); }}
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Legend */}
              <div className="d-flex flex-wrap gap-2">
                {[
                  { cls: "day-today",    label: "Today"       },
                  { cls: "day-selected", label: "Start / End" },
                  { cls: "day-in-range", label: "In range"    },
                  { cls: "day-weekend",  label: "Weekend"     },
                ].map(({ cls, label }) => (
                  <div key={label} className="d-flex align-items-center gap-1">
                    <div
                      className={`calendar-day ${cls}`}
                      style={{ width: 18, height: 18, fontSize: 0, borderRadius: 4, cursor: "default" }}
                    />
                    <small className="text-secondary">{label}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Notes ── */}
          <div className="col-12 col-md-12 col-lg-3">
            <NotesPanel
              year={year}
              month={month}
              startDate={startDate}
              endDate={endDate}
              notes={notes}
              onSaveNote={handleSaveNote}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
