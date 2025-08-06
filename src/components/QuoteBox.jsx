import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import quotes from "../data/parenting_quotes.json";

function QuoteBox({ preview = false }) {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  }, []);

  if (!quote) return <p>Loading...</p>;

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}
    >
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
}

export default QuoteBox;
