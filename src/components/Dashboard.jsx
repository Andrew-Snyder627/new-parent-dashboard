import React from "react";
import NewsFeed from "./NewsFeed";
import VaccineSchedule from "./VaccineSchedule";
import DiaperLog from "./DiaperLog";
import MilestoneTracker from "./MilestoneTracker";
import TodoList from "./TodoList";
import QuoteBox from "./QuoteBox";
// import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-grid">
      <div className="dashboard-panel">
        <NewsFeed />
      </div>
      <div className="dashboard-panel">
        <VaccineSchedule />
      </div>
      <div className="dashboard-panel">
        <DiaperLog />
      </div>
      <div className="dashboard-panel">
        <MilestoneTracker />
      </div>
      <div className="dashboard-panel">
        <TodoList />
      </div>
      <div className="dashboard-panel">
        <QuoteBox />
      </div>
    </div>
  );
}

export default Dashboard;
