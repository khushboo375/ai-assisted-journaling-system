import { useEffect, useState } from "react";
import { getJournals } from "../services/api";

function JournalHistory() {

  const [journals, setJournals] = useState([]);

  useEffect(() => {

    const fetchJournals = async () => {

      try {
        const res = await getJournals("123");
        setJournals(res.data);
      } catch (error) {
        console.error("Error fetching journals:", error);
      }

    };

    fetchJournals();

  }, []);


  const handleDelete = async (id) => {

    try {

      await fetch(`http://localhost:5000/api/journal/${id}`, {
        method: "DELETE"
      });

      setJournals(journals.filter(j => j.id !== id));

    } catch (error) {

      console.error("Delete failed:", error);

    }

  };


  const ambienceIcon = (type) => {

    if(type === "forest") return "🌲 Forest";
    if(type === "rain") return "🌧 Rain";
    if(type === "cafe") return "☕ Cafe";

    return type;

  };


  const emotionColor = (emotion) => {

    if(!emotion) return "#aaa";

    const e = emotion.toLowerCase();

    if(e.includes("peace")) return "#4CAF50";
    if(e.includes("calm")) return "#4CAF50";
    if(e.includes("reflect")) return "#2196F3";
    if(e.includes("happy")) return "#FFC107";
    if(e.includes("sad")) return "#F44336";

    return "#888";

  };


  return (

    <div className="history-container">

      <h1 className="history-title">
        Journal History
      </h1>

      {journals.length === 0 && (
        <p className="no-entry">
          No journal entries yet.
        </p>
      )}

      <div className="history-grid">

      {journals.map((j) => {

        let keywords = [];

        try {
          keywords = j.keywords ? JSON.parse(j.keywords) : [];
        } catch {
          keywords = [];
        }

        return (

          <div key={j.id} className="journal-card">

            <p className="journal-text">
              {j.text}
            </p>

            <div className="journal-meta">

              <span className="ambience">
                {ambienceIcon(j.ambience)}
              </span>

              <span
                className="emotion"
                style={{background: emotionColor(j.emotion)}}
              >
                {j.emotion || "Unknown"}
              </span>

            </div>


            <p className="summary">
              {j.summary || "No summary available"}
            </p>


            {keywords.length > 0 && (

              <div className="keywords">

                {keywords.map((k, index) => (

                  <span key={index} className="keyword-tag">
                    {k}
                  </span>

                ))}

              </div>

            )}


            <div className="journal-footer">

              <span className="date">
                {j.createdAt}
              </span>

              <button
                className="delete-btn"
                onClick={() => handleDelete(j.id)}
              >
                🗑
              </button>

            </div>

          </div>

        );

      })}

      </div>

    </div>

  );

}

export default JournalHistory;