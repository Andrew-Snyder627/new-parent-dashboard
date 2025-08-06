import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NewsFeed({ preview = false }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q="newborn care" OR "infant development" OR "childcare tips" OR "parenting advice" OR "baby sleep"&sortBy=publishedAt&language=en&pageSize=6&apiKey=${apiKey}`
        );
        const data = await response.json();

        if (data.status !== "ok") {
          throw new Error(data.message || "Failed to fetch news");
        }

        setArticles(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [apiKey]);

  // === PREVIEW MODE ===
  if (preview) {
    const topArticles = articles.slice(0, 2); // Show first 2 articles

    return (
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        <h3>Parenting News Preview</h3>

        {loading && <p>Loading preview...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {!loading && !error && topArticles.length === 0 && (
          <p>No articles available.</p>
        )}

        {!loading && !error && (
          <ul>
            {topArticles.map((article, index) => (
              <li key={index} style={{ marginBottom: "0.75rem" }}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <strong>{article.title}</strong>
                </a>
                <br />
                <small>
                  {article.source.name} –{" "}
                  {new Date(article.publishedAt).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        )}

        <div style={{ marginTop: "0.5rem" }}>
          <Link to="/news">View Full News Feed</Link>
        </div>
      </div>
    );
  }

  // === FULL VIEW ===
  return (
    <div>
      <h2>Parenting News Feed</h2>

      {loading && <p>Loading articles...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <ul>
          {articles.map((article, index) => (
            <li key={index} style={{ marginBottom: "1rem" }}>
              <strong>{article.title}</strong>
              <br />
              <em>
                {article.source.name} -{" "}
                {new Date(article.publishedAt).toLocaleDateString()}
              </em>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more →
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NewsFeed;
