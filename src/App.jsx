import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import NewsFeed from "./components/NewsFeed";
import VaccineSchedule from "./components/VaccineSchedule";
import DiaperLog from "./components/DiaperLog";
import MilestoneTracker from "./components/MilestoneTracker";
import TodoList from "./components/TodoList";
import QuoteBox from "./components/QuoteBox";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/news" element={<NewsFeed />} />
        <Route path="/vaccines" element={<VaccineSchedule />} />
        <Route path="/log" element={<DiaperLog />} />
        <Route path="/milestones" element={<MilestoneTracker />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/quotes" element={<QuoteBox />} />

        {/* Catch-all redirect to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
