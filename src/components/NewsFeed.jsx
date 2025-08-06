import React, { useEffect, useState } from "react";

function NewsFeed() {
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
