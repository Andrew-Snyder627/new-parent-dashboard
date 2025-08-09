import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

function NewsFeed({ preview = false }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const pageSize = preview ? 6 : 6;
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  const fetchNews = async (pageToLoad = 1) => {
    try {
      if (pageToLoad === 1) setLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/everything?q="newborn care" OR "infant development" OR "childcare tips" OR "parenting advice" OR "baby sleep"&sortBy=publishedAt&language=en&pageSize=${pageSize}&page=${pageToLoad}&apiKey=${apiKey}`
      );
      const data = await response.json();
      if (data.status !== "ok")
        throw new Error(data.message || "Failed to fetch news");
      setArticles((prev) =>
        pageToLoad === 1 ? data.articles : [...prev, ...data.articles]
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(1);
  }, [apiKey]);

  if (preview) {
    const top = articles.slice(0, 2);
    if (loading) return <p style={{ margin: 0 }}>Loading preview...</p>;
    if (error) return <p style={{ color: "red", margin: 0 }}>Error: {error}</p>;
    if (!top.length) return <p style={{ margin: 0 }}>No articles available.</p>;
    return (
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {top.map((a, i) => (
          <li key={`${a.url}-${i}`} style={{ marginBottom: 8 }}>
            <a href={a.url} target="_blank" rel="noopener noreferrer">
              <strong>{a.title}</strong>
            </a>
            <br />
            <small>
              {a.source.name} – {new Date(a.publishedAt).toLocaleDateString()}
            </small>
          </li>
        ))}
      </ul>
    );
  }

  // FULL PAGE
  return (
    <div>
      <h2>Parenting News Feed</h2>
      {loading && articles.length === 0 && <p>Loading articles...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <ul>
        {articles.map((a, i) => (
          <li key={`${a.url}-${i}`} style={{ marginBottom: "1rem" }}>
            <strong>{a.title}</strong>
            <br />
            <em>
              {a.source.name} - {new Date(a.publishedAt).toLocaleDateString()}
            </em>
            <p>{a.description}</p>
            <a href={a.url} target="_blank" rel="noopener noreferrer">
              Read more →
            </a>
          </li>
        ))}
      </ul>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          const next = page + 1;
          setPage(next);
          fetchNews(next);
        }}
        disabled={loading}
      >
        {loading ? "Loading..." : "Load more"}
      </Button>
    </div>
  );
}

export default NewsFeed;
