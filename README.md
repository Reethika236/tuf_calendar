# 📅 Interactive Wall Calendar

A responsive, interactive wall calendar component built with React and Bootstrap 5 — inspired by the look and feel of a physical wall calendar.

---

## 🖼️ Screenshot

> _Add a screenshot here after running the project locally_
> `![Wall Calendar Screenshot](./Screenshot%202026-04-09%20at%203.51.43 PM.png)`

---

## 🔗 Live Demo


> [https://69d655c6e0bcf70bf2ee33a4--unique-toffee-ebd5f1.netlify.app/](https://your-demo-link.com)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI and component logic |
| Vite | Development build tool |
| Bootstrap 5 | Layout and utility styling |
| CSS | Custom calendar styles |
| localStorage | Notes persistence |

---

## ✨ Features

- **Date range selection** — click a start date, click an end date
- **Smart auto-swap** — if you click an earlier date second, the range flips automatically
- **Hover preview** — highlights the range before you confirm the second click
- **Single-day selection** — clicking the same date twice selects just that day
- **Month navigation** — prev/next buttons to move between months
- **Weekend highlighting** — Saturdays and Sundays styled differently
- **Today indicator** — current date is always highlighted with a dot marker
- **Notes panel** — write and save notes per month, persisted in localStorage
- **Selected range summary bar** — shows the active range with a one-click clear button
- **Seasonal hero images** — the side panel image changes based on the current season
- **Fully responsive** — 3-column layout on desktop, stacks vertically on mobile

---

## 📁 Project Structure

```
src/
├── App.jsx                          # Entry point
├── components/
│   ├── CalendarContainer.jsx        # Main component, holds all state
│   ├── CalendarGrid.jsx             # 7-column day grid renderer
│   ├── DayCell.jsx                  # Single day cell with highlight logic
│   ├── Header.jsx                   # Month title + prev/next navigation
│   └── NotesPanel.jsx               # Notes textarea + save to localStorage
├── utils/
│   └── calendarHelpers.js           # Pure helper functions and constants
└── styles/
    └── calendar.css                 # All custom CSS
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Reethika236/tuf_calendar.git

# 2. Move into the project folder
cd wall-calendar

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

---

## 🧠 How It Works

### Date Range Selection (two-click model)

```
First click  → sets the start date, clears any previous range
Second click → sets the end date
             → if clicked date is before start, the range auto-swaps
             → if same date as start, treated as single-day selection
New click after range is complete → resets and starts a fresh selection
```

### State Structure

```js
currentDate   // drives which month/year is displayed
startDate     // first selected date
endDate       // second selected date
hoverDate     // ghost end date for hover preview before confirming
notes         // { "wall-cal-note-2025-3": "text" } — persisted to localStorage
```

### Notes Persistence

Notes are saved as a JSON object in `localStorage` under the key `wall-cal-notes`. Each month gets its own entry keyed by year and month number. Notes survive page refreshes and browser restarts.

---

## 📐 Layout

| Breakpoint | Layout |
|---|---|
| Mobile (`col-12`) | Hero → Calendar → Notes stacked vertically |
| Tablet (`col-md`) | Hero + Calendar side by side, Notes below |
| Desktop (`col-lg`) | Hero \| Calendar \| Notes in 3 columns |

---

## 🔮 Future Improvements

- [ ] Drag-to-select date ranges
- [ ] Per-day notes (not just per month)
- [ ] Dark mode toggle
- [ ] Export selected range as .ics calendar file
- [ ] Recurring event markers
- [ ] Google Calendar integration

---

## 📚 What I Learned

- Keeping all state in a single parent component (`CalendarContainer`) makes data flow predictable and easy to debug — no need for Context or Redux at this scale
- The two-click selection model with auto-swap handles most edge cases cleanly without complex conditional trees
- Bootstrap's responsive grid handles layout breakpoints well but custom CSS is still needed for component-level styling like the calendar grid itself
- `localStorage` is sufficient for lightweight persistence without a backend

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

_Built as a Frontend Engineering Challenge project._
