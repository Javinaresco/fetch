import React, { useState, useEffect } from "react";
import "../css/Api.css";
import { useTheme } from "./Context/ThemeContext"; // Import the useTheme hook

export const LlamadaApi = () => {
  const { theme } = useTheme(); // Access the current theme
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCatFact = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://catfact.ninja/fact");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setFact(data.fact);
    } catch (error) {
      console.error("Error fetching cat fact:", error);
      setFact("Failed to fetch cat fact. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatFact();
  }, []);

  return (
    <div className={`Tod ${theme}`}> {/* Apply theme class */}
      <h1>Random Cat Fact</h1>
      {loading ? <p>Loading...</p> : <p>{fact}</p>}
      <button onClick={fetchCatFact}>Get New Fact</button>
    </div>
  );
};