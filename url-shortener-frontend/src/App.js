import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!url) return;

    setLoading(true);

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied!");
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
            Copy
          </button>
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
    width: "300px",
    marginRight: "10px",
  },
  button: {
    padding: "10px 20px",
    cursor: "pointer",
  },
  result: {
    marginTop: "20px",
  },
  copyBtn: {
    marginTop: "10px",
    padding: "8px 16px",
  },
};

export default App;