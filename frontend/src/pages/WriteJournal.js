
import { useState } from "react";
import { createJournal } from "../services/api";

function WriteJournal({ setTheme }) {

  const [ambience, setAmbience] = useState("forest");
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const selectAmbience = (type) => {
    setAmbience(type);
    setTheme(type);
  };

  // SAVE JOURNAL
  const submitJournal = async () => {

    if (!text.trim()) {
      alert("Please write something in the journal");
      return;
    }

    try {

      const res = await createJournal({
        userId: "123",
        ambience,
        text
      });

      setAnalysis(res.data.analysis);
      setText("");

    } catch (error) {

      console.error("Error saving journal:", error);

    }

  };

  return (

    <div className="journal-container">

      <h1>Take a moment. What are you feeling today?</h1>

      {/* AMBIENCE SELECTOR */}
      <h3>Pick an ambience that matches your mood.</h3>
      <div className="ambience-selector">
        <button
          className={ambience === "forest" ? "active" : ""}
          onClick={() => selectAmbience("forest")}
        >
          🌲 Forest
        </button>

        <button
          className={ambience === "rain" ? "active" : ""}
          onClick={() => selectAmbience("rain")}
        >
          🌧 Rain
        </button>

        <button
          className={ambience === "cafe" ? "active" : ""}
          onClick={() => selectAmbience("cafe")}
        >
          ☕ Cafe
        </button>

      </div>

      {/* JOURNAL TEXT */}

      <textarea
        placeholder="Write your thoughts..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* SAVE BUTTON */}

      <button onClick={submitJournal} className="save-btn">
        Save
      </button>

      {/* AI ANALYSIS RESULT */}

      {analysis && (

        <div className="analysis-box">

          <h3>AI Analysis</h3>

          <p>
            <b>Emotion:</b> {analysis.emotion}
          </p>

          <p>
            <b>Summary:</b> {analysis.summary}
          </p>

        </div>

      )}

    </div>
  );
}

export default WriteJournal;