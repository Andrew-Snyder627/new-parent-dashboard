import React from "react";
import styles from "../styles/Home.module.css";
import CardShell from "../ui/CardShell";
import QuoteBox from "./QuoteBox";
import NewsFeed from "./NewsFeed";
import TodoList from "./TodoList";
import MilestoneTracker from "./MilestoneTracker";
import VaccineSchedule from "./VaccineSchedule";
import DiaperLog from "./DiaperLog";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  return (
    <div className={styles.container}>
      <h1 style={{ marginBottom: 16 }}>Welcome, New Parent!</h1>

      <div className={styles.grid}>
        <div className={styles.areaQuote}>
          <CardShell
            title="Daily Inspiration"
            footer={
              <Button component={RouterLink} to="/quotes">
                View More
              </Button>
            }
          >
            <QuoteBox preview />
          </CardShell>
        </div>

        <div className={styles.areaNews}>
          <CardShell
            title="Parenting News"
            footer={
              <Button component={RouterLink} to="/news">
                View Full News Feed
              </Button>
            }
          >
            <NewsFeed preview />
          </CardShell>
        </div>

        <div className={styles.areaTodo}>
          <CardShell
            title="To-Do List"
            footer={
              <Button component={RouterLink} to="/todos">
                View Full To-Do
              </Button>
            }
          >
            <TodoList preview />
          </CardShell>
        </div>

        <div className={styles.areaMilestones}>
          <CardShell
            title="Milestones"
            footer={
              <Button component={RouterLink} to="/milestones">
                View All Milestones
              </Button>
            }
          >
            <MilestoneTracker preview />
          </CardShell>
        </div>

        <div className={styles.areaVaccines}>
          <CardShell
            title="Vaccinations"
            footer={
              <Button component={RouterLink} to="/vaccines">
                View Full Schedule
              </Button>
            }
          >
            <VaccineSchedule preview />
          </CardShell>
        </div>

        <div className={styles.areaLog}>
          <CardShell
            title="Recent Log"
            footer={
              <Button component={RouterLink} to="/log">
                View Full Log
              </Button>
            }
          >
            <DiaperLog preview />
          </CardShell>
        </div>
      </div>
    </div>
  );
}

export default Home;
