import React, { useState, useEffect } from "react";
import localQuotes from "../data/parenting_quotes.json";

function QuoteBox() {
  const [quote, setQuote] = useState(null);

  const getRandomQuote = () => {
    const random = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    setQuote(random);
  };

  useEffect(() => {
    getRandomQuote(); // get one on load
  }, []);

  return (
    <div>
      <h2>Daily Inspiration</h2>

      {quote && (
        <blockquote style={{ fontStyle: "italic" }}>
          “{quote.quote}”
          <br />
          <span
            style={{
              display: "block",
              textAlign: "right",
              marginTop: "0.5rem",
            }}
          >
            — {quote.author}
          </span>
        </blockquote>
      )}

      <button onClick={getRandomQuote} style={{ marginTop: "1rem" }}>
        New Quote
      </button>
    </div>
  );
}

export default QuoteBox;
