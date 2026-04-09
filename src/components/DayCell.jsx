import { isSameDay, isBetween, isWeekend } from "../utils/calendarHelpers";

export default function DayCell({ date, startDate, endDate, hoverDate, today, onSelect, onHover }) {
  if (!date) return <div className="calendar-day empty" />;

  const effectiveEnd = endDate || hoverDate;
  const isStart    = isSameDay(date, startDate);
  const isEnd      = isSameDay(date, endDate);
  const inRange    = isBetween(date, startDate, effectiveEnd);
  const isToday    = isSameDay(date, today);
  const weekend    = isWeekend(date);

  let className = "calendar-day";
  if (isStart || isEnd)  className += " day-selected";
  else if (inRange)      className += " day-in-range";
  else if (isToday)      className += " day-today";
  else if (weekend)      className += " day-weekend";
  else                   className += " day-normal";

  return (
    <div
      className={className}
      onClick={() => onSelect(date)}
      onMouseEnter={() => onHover(date)}
      onMouseLeave={() => onHover(null)}
      title={date.toDateString()}
    >
      {date.getDate()}
      {isToday && <span className="today-dot" />}
    </div>
  );
}
