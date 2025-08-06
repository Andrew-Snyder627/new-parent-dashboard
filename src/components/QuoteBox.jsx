import React, { useRef } from "react";
import { Link } from "react-router-dom";
import quotes from "../data/parenting_quotes.json";

// Shared styles
const cardStyle = {
  border: "1px solid #ccc",
  padding: "1rem",
  borderRadius: "8px",
};

const QuoteBox = ({ preview = false }) => {
  const quoteRef = useRef(quotes[Math.floor(Math.random() * quotes.length)]);
  const quote = quoteRef.current;

  return (
    <div style={cardStyle}>
      <h3>Daily Inspiration</h3>
      <blockquote style={{ fontStyle: "italic", margin: "0.5rem 0" }}>
        “{quote.quote}”
        <br />
        <small>— {quote.author}</small>
      </blockquote>

      {preview && (
        <div style={{ marginTop: "0.5rem" }}>
          <Link to="/quotes">View More Quotes</Link>
        </div>
      )}
    </div>
  );
};

export default React.memo(QuoteBox);
