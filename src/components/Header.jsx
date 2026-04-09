import { MONTH_NAMES } from "../utils/calendarHelpers";

export default function Header({ month, year, onPrev, onNext }) {
  return (
    <div className="d-flex align-items-center justify-content-between mb-2 px-1">
      <button
        className="btn btn-sm btn-outline-secondary nav-btn"
        onClick={onPrev}
        aria-label="Previous month"
      >
        ‹
      </button>

      <h5 className="mb-0 fw-semibold calendar-month-title">
        {MONTH_NAMES[month]}{" "}
        <span className="text-secondary fw-normal">{year}</span>
      </h5>

      <button
        className="btn btn-sm btn-outline-secondary nav-btn"
        onClick={onNext}
        aria-label="Next month"
      >
        ›
      </button>
    </div>
  );
}
