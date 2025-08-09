import React, { useEffect, useState } from "react";
import styles from "../styles/Page.module.css";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  Link as MuiLink,
  Chip,
  Paper,
} from "@mui/material";

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
    if (loading)
      return <Typography sx={{ m: 0 }}>Loading preview...</Typography>;
    if (error)
      return (
        <Typography color="error" sx={{ m: 0 }}>
          Error: {error}
        </Typography>
      );
    if (!top.length)
      return <Typography sx={{ m: 0 }}>No articles available.</Typography>;

    return (
      <Stack spacing={1}>
        {top.map((a, i) => (
          <Box key={`${a.url}-${i}`}>
            <MuiLink
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {a.title}
              </Typography>
            </MuiLink>
            <Typography variant="caption" color="text.secondary">
              {a.source.name} • {new Date(a.publishedAt).toLocaleDateString()}
            </Typography>
          </Box>
        ))}
      </Stack>
    );
  }

  // FULL PAGE
  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.header}>
        Parenting News Feed
      </Typography>

      {loading && articles.length === 0 && (
        <Typography>Loading articles...</Typography>
      )}
      {error && <Typography color="error">Error: {error}</Typography>}

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack divider={<Divider />} spacing={2}>
          {articles.map((a, i) => (
            <Box key={`${a.url}-${i}`}>
              <MuiLink
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                  {a.title}
                </Typography>
              </MuiLink>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Chip size="small" label={a.source.name} />
                <Typography variant="caption" color="text.secondary">
                  {new Date(a.publishedAt).toLocaleDateString()}
                </Typography>
              </Stack>

              {a.description && (
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  {a.description}
                </Typography>
              )}

              <MuiLink href={a.url} target="_blank" rel="noopener noreferrer">
                Read more →
              </MuiLink>
            </Box>
          ))}
        </Stack>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={() => {
              const next = page + 1;
              setPage(next);
              fetchNews(next);
            }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load more"}
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

export default NewsFeed;
