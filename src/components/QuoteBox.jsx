import React, { useRef } from "react";
import quotes from "../data/parenting_quotes.json";

function QuoteBox({ preview = false }) {
  const quoteRef = useRef(quotes[Math.floor(Math.random() * quotes.length)]);
  const quote = quoteRef.current;

  return (
    <blockquote style={{ fontStyle: "italic", margin: 0 }}>
      “{quote.quote}”
      <br />
      <small>— {quote.author}</small>
    </blockquote>
  );
}

export default React.memo(QuoteBox);
