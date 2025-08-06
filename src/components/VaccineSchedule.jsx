import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import vaccineData from "../data/vaccines.json";

function VaccineSchedule({ preview = false }) {
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem("vaccineChecklist");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("vaccineChecklist", JSON.stringify(checked));
  }, [checked]);

  const handleChange = (age, vaccine) => {
    setChecked((prev) => ({
      ...prev,
      [`${age}-${vaccine}`]: !prev[`${age}-${vaccine}`],
    }));
  };

  // === PREVIEW MODE ===
  if (preview) {
    const previewData = vaccineData.slice(0, 2); // Show first 2 age groups

    return (
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        <h3>Vaccination Preview</h3>
        {previewData.map((entry) => (
          <div key={entry.age} style={{ marginBottom: "0.75rem" }}>
            <strong>{entry.age}</strong>
            <ul>
              {entry.vaccines.map((vaccine) => {
                const key = `${entry.age}-${vaccine}`;
                return (
                  <li key={key}>
                    <input type="checkbox" checked={!!checked[key]} readOnly />
                    {` ${vaccine}`}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <div style={{ marginTop: "0.5rem" }}>
          <Link to="/vaccines">View Full Vaccine Schedule</Link>
        </div>
      </div>
    );
  }

  // === FULL VIEW ===
  return (
    <div>
      <h2>Vaccination Checklist</h2>
      {vaccineData.map((entry) => (
        <div key={entry.age} style={{ marginBottom: "1rem" }}>
          <h4>{entry.age}</h4>
          <ul>
            {entry.vaccines.map((vaccine) => {
              const key = `${entry.age}-${vaccine}`;
              return (
                <li key={key}>
                  <label>
                    <input
                      type="checkbox"
                      checked={!!checked[key]}
                      onChange={() => handleChange(entry.age, vaccine)}
                    />
                    {` ${vaccine}`}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default VaccineSchedule;
