import React from "react";
import QuoteBox from "../components/QuoteBox";

function Home() {
  return (
    <div className="home-dashboard" style={{ padding: "2rem" }}>
      <h1>Welcome, New Parent!</h1>
      <div
        className="dashboard-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        <QuoteBox preview />
        {/* Insert other preview components here later */}
      </div>
    </div>
  );
}

export default Home;
