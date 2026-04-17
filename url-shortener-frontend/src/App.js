import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);

  const handleShorten = async () => {
    if (!url) return;

    setLoading(true);
    setShortUrl("");
    setStats(null);

    try {
      const res = await fetch("https://shortener-qym2.onrender.com/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (data.short_url) {
        setShortUrl(data.short_url);
      } else {
        alert("Error shortening URL");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const getCode = (url) => {
    return url.split("/").pop();
  };

  const fetchStats = async () => {
    if (!shortUrl) return;

    setStatsLoading(true);

    try {
      const code = getCode(shortUrl);

      const res = await fetch(
        `https://shortener-qym2.onrender.com/stats/${code}`
      );

      const data = await res.json();

      if (!data.error) {
        setStats(data);
      } else {
        alert("Stats not found");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching stats");
    }

    setStatsLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1>🔗 URL Shortener</h1>

      <input
        type="text"
        placeholder="Enter your long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleShorten} style={styles.button}>
        {loading ? "Shortening..." : "Shorten"}
      </button>

      {shortUrl && (
        <div style={styles.result}>
          <p>
            Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </p>

          <button onClick={copyToClipboard} style={styles.copyBtn}>
            {copied ? "Copied successfully" : "Copy"}
          </button>

          <br />

          <button onClick={fetchStats} style={styles.statsBtn}>
            {statsLoading ? "Loading..." : "Show Stats"}
          </button>

          {stats && (
            <div style={styles.statsBox}>
              <p><strong>Clicks:</strong> {stats.clicks}</p>
              <p><strong>Original URL:</strong> {stats.original_url}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    fontFamily: "Arial",
  },
  input: {
    padding: "10px",
    width: "320px",
    marginRight: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
  },
  result: {
    marginTop: "20px",
  },
  copyBtn: {
    marginTop: "10px",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#28a745",
    color: "white",
  },
  statsBtn: {
    marginTop: "10px",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#6c757d",
    color: "white",
  },
  statsBox: {
    marginTop: "15px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    display: "inline-block",
    textAlign: "left",
  },
};

export default App;