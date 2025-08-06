import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultMilestones from "../data/milestones.json";

function MilestoneTracker({ preview = false }) {
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("milestoneChecklist");
    return saved ? JSON.parse(saved) : {};
  });

  const [customMilestones, setCustomMilestones] = useState(() => {
    const saved = localStorage.getItem("customMilestones");
    return saved ? JSON.parse(saved) : [];
  });

  const [newMilestone, setNewMilestone] = useState("");

  useEffect(() => {
    localStorage.setItem("milestoneChecklist", JSON.stringify(completed));
  }, [completed]);

  useEffect(() => {
    localStorage.setItem("customMilestones", JSON.stringify(customMilestones));
  }, [customMilestones]);

  const toggleMilestone = (milestone) => {
    setCompleted((prev) => ({
      ...prev,
      [milestone]: !prev[milestone],
    }));
  };

  const handleAddMilestone = (e) => {
    e.preventDefault();
    const trimmed = newMilestone.trim();
    if (
      trimmed &&
      ![...defaultMilestones, ...customMilestones].includes(trimmed)
    ) {
      setCustomMilestones([trimmed, ...customMilestones]);
      setNewMilestone("");
    }
  };

  const allMilestones = [...defaultMilestones, ...customMilestones];

  // === PREVIEW MODE ===
  if (preview) {
    const recent = allMilestones.slice(0, 4); // Show 4 milestones as a preview
    return (
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        <h3>Milestone Tracker</h3>
        <ul>
          {recent.map((milestone) => (
            <li key={milestone}>
              <input
                type="checkbox"
                checked={!!completed[milestone]}
                readOnly
              />
              {` ${milestone}`}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: "0.5rem" }}>
          <Link to="/milestones">View All Milestones</Link>
        </div>
      </div>
    );
  }

  // === FULL VIEW ===
  return (
    <div>
      <h2>Milestone Tracker</h2>

      <form onSubmit={handleAddMilestone} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={newMilestone}
          onChange={(e) => setNewMilestone(e.target.value)}
          placeholder="Add a new milestone"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {allMilestones.map((milestone) => (
          <li key={milestone}>
            <label>
              <input
                type="checkbox"
                checked={!!completed[milestone]}
                onChange={() => toggleMilestone(milestone)}
              />
              {` ${milestone}`}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MilestoneTracker;
