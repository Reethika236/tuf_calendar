import { DAYS_OF_WEEK, buildCalendarDays } from "../utils/calendarHelpers";
import DayCell from "./DayCell";

export default function CalendarGrid({
  year, month,
  startDate, endDate, hoverDate, today,
  onSelect, onHover,
}) {
  const days = buildCalendarDays(year, month);

  return (
    <div className="calendar-grid">
      {DAYS_OF_WEEK.map((d) => (
        <div key={d} className="day-header">{d}</div>
      ))}
      {days.map((date, i) => (
        <DayCell
          key={i}
          date={date}
          startDate={startDate}
          endDate={endDate}
          hoverDate={hoverDate}
          today={today}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
}
