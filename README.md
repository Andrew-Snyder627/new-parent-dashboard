# New Parent Resource Finder 👶🍼

A modern React dashboard designed to support new parents with helpful tools and information. Features include a parenting news feed, vaccination checklist, diaper and feeding log, milestone tracker, to-do list, and daily inspirational quotes — all accessible via dedicated routes or as previews on the homepage.

Recent updates include **Material UI (MUI)** integration for a clean, professional, and consistent interface, with enhanced layouts, interactive components, and modern styling across all tools.

---

## 🚀 Features

### ✅ Routing + Dashboard Preview

- All major features have **dedicated routes** (`/news`, `/vaccines`, `/log`, `/milestones`, `/todos`, `/quotes`).
- The homepage (`/`) acts as a **dashboard**, showing **preview versions** of each tool.
- Each preview offers a **“View More”** button to navigate to the full version.
- Shared `Page.module.css` styles ensure consistent spacing and typography across pages.

### ✅ Parenting News Feed

- Pulls live articles using [NewsAPI](https://newsapi.org/).
- Filters news by parenting-focused keywords.
- **Preview**: top 2 headlines on the dashboard.
- **Full page**: source chip, date, description, and **Load More** pagination.
- UI uses **MUI**: `Paper`, `Stack`, `Divider`, `Chip`, `Typography`, `Button`.

### ✅ Vaccination Checklist

- First-year schedule organized by age (birth → 12 months).
- Check off vaccines; persists via `localStorage`.
- UI uses **MUI Table** (`Table`, `TableHead`, `TableBody`, `TableRow`, `TableCell`) and `Checkbox`.

### ✅ Diaper & Feeding Log

- Log entries with time, type (diaper/feeding), and notes; persistent history in `localStorage`.
- UI uses **MUI Form** inputs and **MUI Table** for the history list.

### ✅ Milestone Tracker

- Track default milestones and add custom ones; completion persisted in `localStorage`.
- Grouped into buckets: **0–3**, **4–6**, **7–9**, **10–12 months**.
- UI uses **MUI Accordion** (`Accordion`, `AccordionSummary`, `AccordionDetails`) + `Checkbox`.
- Preview shows recent milestones in a compact list.

### ✅ To-Do List

- Add, toggle-complete, and delete tasks; persisted in `localStorage`.
- UI uses **MUI List** (`List`, `ListItem`, `ListItemText`, `Checkbox`) and `DeleteIcon`.
- Preview shows top 3 tasks.

### ✅ Daily Inspiration

- Random quote from local JSON; stable across navigation via `useRef`.
- Full page is **searchable** and **paginated**.
- UI uses **MUI**: `Paper`, `Stack`, `Divider`, `TextField`, `Button`, `Typography`.

---

## 🛠️ Tech Stack

- **React** (Hooks + functional components)
- **React Router DOM** (routing and navigation)
- **Material UI (MUI)**
  - Core: `Paper`, `Stack`, `Divider`, `Typography`, `Button`, `TextField`, `Checkbox`, `Chip`, `List`, `Accordion`, `Table`
  - Icons: `DeleteIcon`, `ExpandMoreIcon`
- **Vite** (dev server + bundler)
- **CSS Modules** (`Page.module.css`) for shared page-level styles
- **localStorage** for client-side persistence

---

## 📁 File Structure

```
src/
│
├── assets/                     // Static assets (images, icons, etc.)
│
├── components/
│   ├── DiaperLog.jsx           // MUI form + table for diaper/feeding tracking
│   ├── Home.jsx                // Dashboard-style landing with previews
│   ├── MilestoneTracker.jsx    // MUI accordions for milestone tracking
│   ├── Navbar.jsx              // MUI AppBar with navigation links
│   ├── NewsFeed.jsx            // MUI-styled news feed with preview/full modes
│   ├── QuoteBox.jsx            // Preview card for daily inspirational quote
│   ├── Quotes.jsx              // Searchable + paginated quotes in MUI Paper
│   ├── TodoList.jsx            // MUI list with checkboxes + delete
│   └── VaccineSchedule.jsx     // MUI-styled vaccine table
│
├── data/
│   ├── milestones.json
│   ├── parenting_quotes.json
│   └── vaccines.json
│
├── styles/
│   ├── CardShell.module.css    // Styling for reusable card component
│   ├── Home.module.css         // Dashboard grid and layout styles
│   └── Page.module.css         // Shared page-level styles for consistent layout
│
├── ui/
│   └── CardShell.jsx           // Reusable MUI Paper card wrapper for previews
│
├── App.css                     // Global CSS overrides
├── App.jsx                     // Routing structure + top-level layout
├── index.css                   // Base styles
├── main.jsx                    // Entry point
└── theme.js                    // MUI theme customization
```

---

## 📦 Setup Instructions

1. Clone the repo

   ```bash
   git clone https://github.com/your-username/new-parent-resource-finder.git
   cd new-parent-resource-finder
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables  
   Create a `.env` file with your NewsAPI key:

   ```env
   VITE_NEWS_API_KEY=your_api_key_here
   ```

4. Start the dev server

   ```bash
   npm run dev
   ```

---

## 🚧 Known Issues / In Progress

- Some public APIs (like Quotable) failed due to certificate issues — switched to a local quote file for MVP.
- Initial dashboard styling was minimal; upgraded to Material UI (MUI) components for a modern, responsive look.
- Challenges during styling updates included:
  - Integrating MUI `Paper`, `Stack`, `Typography`, `Button`, and `Table` while keeping consistent spacing and layout.
  - Ensuring individual feature pages (NewsFeed, Milestone Tracker, To-Do List, Quotes) each had a clean, cohesive design while still feeling unique.
  - Managing responsive design for both preview cards and full-page views.
- Future plans include:
  - Milestone date tracking
  - Sleep log and feeding timer
  - Optional authentication (to sync data across devices)
  - Dark mode theme toggle
  - Additional animations and transitions for a smoother UX

---

## ✅ MVP Requirements Met

- [x] Integrated third-party API (NewsAPI)
- [x] Built in React with multiple views/components
- [x] React Router navigation and dashboard with preview rendering
- [x] Dynamic fetch + loading/error state handling
- [x] LocalStorage used for persistent features
- [x] Upgraded to Material UI for professional, modern styling
- [x] Consistent layout patterns using MUI `Paper`, `Stack`, `Typography`, and `Button`
- [x] Clearly defined problem and audience
- [x] Clean, modular codebase with reusable components

---

## 🧠 Problem + Solution

**Problem:**  
New parents are overwhelmed and need a central place to track key activities and access trusted information. Most tools are bloated, poorly designed, or spread across multiple apps. Even when features are available, they are often not presented in a way that feels clean and easy to use.

**Solution:**  
A single-page dashboard with all essential tools — news, checklists, logs, and quotes — all accessible offline and without sign-in. The interface was styled with Material UI to provide a clean, professional, and responsive layout that’s easy to navigate. Using MUI’s prebuilt components ensured design consistency, while custom CSS Modules allowed for unique visual identity across different pages.

---

## ✍️ Author

- Andrew Snyder (Flatiron Bootcamp Project 1)
- Built using React, Vite, NewsAPI, and love for parents everywhere ❤️
