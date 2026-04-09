export const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const HERO_IMAGES = [
  "https://plus.unsplash.com/premium_photo-1667926194869-e1e27051830f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1669406584379-59f827e4d35e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export function getHeroImage(month) {
  if (month <= 2) return HERO_IMAGES[0];
  if (month <= 5) return HERO_IMAGES[1];
  if (month <= 8) return HERO_IMAGES[2];
  return HERO_IMAGES[3];
}

export function toKey(date) {
  return date ? date.toISOString().split("T")[0] : null;
}

// export function isSameDay(a, b) {
//   return a && b && toKey(a) === toKey(b);
// }
export function isSameDay(a, b) {
  if (!a || !b) return false;   // ✅ FIX
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// export function isBetween(date, start, end) {
//   if (!start || !end || !date) return false;
//   const d = date.getTime();
//   const s = start.getTime();
//   const e = end.getTime();
//   return d > Math.min(s, e) && d < Math.max(s, e);
// }
export function isBetween(date, start, end) {
  if (!date || !start || !end) return false;  // ✅ FIX
  return date >= start && date <= end;
}

// export function isWeekend(date) {
//   const day = date.getDay();
//   return day === 0 || day === 6;
// }
export function isWeekend(date) {
  if (!date) return false;
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function buildCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
  return days;
}

export function formatRange(start, end) {
  if (!start) return "No date selected";
  const opts = { month: "short", day: "numeric", year: "numeric" };
  if (!end || isSameDay(start, end)) {
    return start.toLocaleDateString("en-US", opts);
  }
  const [s, e] = start <= end ? [start, end] : [end, start];
  return `${s.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${e.toLocaleDateString("en-US", opts)}`;
}

export function noteKey(year, month) {
  return `wall-cal-note-${year}-${month}`;
}
