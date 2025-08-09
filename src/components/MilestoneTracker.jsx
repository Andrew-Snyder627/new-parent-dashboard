import React, { useState, useEffect } from "react";
import defaultMilestones from "../data/milestones.json";

/**
 * Age buckets mapped to your current milestones.
 * Adjust the sets as needed.
 */
const BUCKETS = {
  "0–3 months": new Set(["First smile"]),
  "4–6 months": new Set(["Rolls over", "Sits up", "Sleeps through the night"]),
  "7–9 months": new Set(["Crawling", "Pulls to stand", "Feeds self"]),
  "10–12 months": new Set(["First steps", "Waves goodbye", "First word"]),
};

function MilestoneTracker({ preview = false }) {
  // Completed status map: { "First smile": true, ... }
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("milestoneChecklist");
    return saved ? JSON.parse(saved) : {};
  });

  // User-added milestones
  const [customMilestones, setCustomMilestones] = useState(() => {
    const saved = localStorage.getItem("customMilestones");
    return saved ? JSON.parse(saved) : [];
  });

  const [newMilestone, setNewMilestone] = useState("");

  // Persist to localStorage
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

  // Combine defaults + custom
  const allMilestones = [...defaultMilestones, ...customMilestones];

  // ===== PREVIEW (Home dashboard tile) =====
  if (preview) {
    const recent = allMilestones.slice(0, 4);
    return recent.length === 0 ? (
      <p style={{ margin: 0 }}>No milestones yet.</p>
    ) : (
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {recent.map((m) => (
          <li key={m}>
            <input type="checkbox" checked={!!completed[m]} readOnly /> {m}
          </li>
        ))}
      </ul>
    );
  }

  // ===== FULL PAGE (grouped by buckets) =====
  const grouped = Object.entries(BUCKETS).reduce((acc, [label, set]) => {
    acc[label] = allMilestones.filter((m) => set.has(m));
    return acc;
  }, {});

  // Anything not caught by buckets goes to "Other" (custom/unmatched items)
  const matched = new Set(Object.values(grouped).flat());
  const other = allMilestones.filter((m) => !matched.has(m));

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

      {Object.entries(grouped).map(([label, items]) =>
        items.length > 0 ? (
          <section key={label} style={{ marginBottom: "1rem" }}>
            <h4 style={{ margin: "8px 0" }}>{label}</h4>
            <ul>
              {items.map((m) => (
                <li key={m}>
                  <label>
                    <input
                      type="checkbox"
                      checked={!!completed[m]}
                      onChange={() => toggleMilestone(m)}
                    />{" "}
                    {m}
                  </label>
                </li>
              ))}
            </ul>
          </section>
        ) : null
      )}

      {other.length > 0 && (
        <section>
          <h4 style={{ margin: "8px 0" }}>Other</h4>
          <ul>
            {other.map((m) => (
              <li key={m}>
                <label>
                  <input
                    type="checkbox"
                    checked={!!completed[m]}
                    onChange={() => toggleMilestone(m)}
                  />{" "}
                  {m}
                </label>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default MilestoneTracker;
