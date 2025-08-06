import React, { useState, useEffect } from "react";
import defaultMilestones from "../data/milestones.json";

function MilestoneTracker() {
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
