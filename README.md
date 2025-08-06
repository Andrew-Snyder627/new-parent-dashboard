# New Parent Resource Finder 👶🍼

A React dashboard designed to support new parents with helpful tools and information. Features include a parenting news feed, vaccination checklist, diaper and feeding log, milestone tracker, to-do list, and daily inspirational quotes.

---

## 🚀 Features

### ✅ Parenting News Feed

- Pulls live articles using [NewsAPI](https://newsapi.org/)
- Filters news by relevant keywords like "infant", "parenting", and "childcare"
- Shows headline, source, snippet, and link to full article

### ✅ Vaccination Checklist

- Displays CDC-recommended vaccines for the first year of life
- Organized by age (birth to 12 months)
- Check off completed vaccines
- Persists data with `localStorage`

### ✅ Diaper & Feeding Log

- Log diaper changes and feedings with time, type, and notes
- View a full history of entries
- Stored locally for persistent tracking

### ✅ Milestone Tracker

- Track baby's development milestones
- Add your own custom milestones
- Check off milestones as they’re reached
- Persists both checklist and custom data in `localStorage`

### ✅ To-Do List

- Add, complete, and delete parenting-related tasks
- Simple, fast, persistent daily tracker

### ✅ Daily Inspiration

- Displays a randomly selected parenting/inspirational quote from a local JSON file
- Refresh for a new quote
- Fast and offline-friendly

---

## 🛠️ Tech Stack

- React (with Hooks and functional components)
- React Router DOM
- Vite (development server + bundler)
- `localStorage` for persistence
- CSS (Dashboard layout coming in next iteration)

---

## 📁 File Structure

```
src/
│
├── components/
│   ├── Dashboard.jsx
│   ├── NewsFeed.jsx
│   ├── VaccineSchedule.jsx
│   ├── DiaperLog.jsx
│   ├── MilestoneTracker.jsx
│   ├── TodoList.jsx
│   └── QuoteBox.jsx
│
├── data/
│   ├── vaccines.json
│   ├── milestones.json
│   └── parenting_quotes.json
│
├── App.jsx
├── main.jsx
└── App.css
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
- Dashboard styling (layout, responsiveness) will be implemented in the next iteration.
- Future plans include:
  - Milestone date tracking
  - Sleep log and feeding timer
  - Optional authentication (to sync data across devices)

---

## ✅ MVP Requirements Met

- [x] Integrated third-party API (NewsAPI)
- [x] Built in React with multiple views/components
- [x] Dynamic fetch + loading/error state handling
- [x] LocalStorage used for persistent features
- [x] Clearly defined problem and audience
- [x] Clean, modular codebase with reusable components

---

## 🧠 Problem + Solution

**Problem:** New parents are overwhelmed and need a central place to track key activities and access trusted information. Most tools are bloated or spread across apps.

**Solution:** A single-page dashboard with all essential tools — news, checklists, logs, and quotes — all accessible offline and without sign-in.

---

## ✍️ Author

- Andrew Snyder (Flatiron Bootcamp Project 1)
- Built using React, Vite, NewsAPI, and love for parents everywhere ❤️
