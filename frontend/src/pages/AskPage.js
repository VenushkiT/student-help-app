import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AskPage = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Extract file and title from URL
  const searchParams = new URLSearchParams(location.search);
  const file = searchParams.get("file");
  const title = searchParams.get("title");

  useEffect(() => {
    if (file) {
      console.log("Loaded file for query:", file);
    }
  }, [file]);

  const handleSendQuery = async () => {
    if (!query.trim()) {
      alert("Please enter a question.");
      return;
    }

    if (!file) {
      alert("No study material found. Please try again.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, file })
      });

      const data = await res.json();
      setResponse(data.answer || "No response.");
    } catch (error) {
      console.error("Error querying AI:", error);
      setResponse("Error retrieving response. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2>Ask About: {title || "Material"}</h2>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your question..."
        rows={4}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      ></textarea>
      <br />
      <button onClick={handleSendQuery} style={{ marginTop: "10px" }} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default AskPage;
