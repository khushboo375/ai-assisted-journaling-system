import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WriteJournal from "./pages/WriteJournal";
import JournalHistory from "./pages/JournalHistory";
import Insights from "./pages/Insights";
import Navbar from "./components/Navbar";

import "./styles/theme.css";

function App() {

  const [theme, setTheme] = useState("forest");

  return (
    <div className={`app-container ${theme}`}>
      <Router>

        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<WriteJournal setTheme={setTheme} />}
          />

          <Route
            path="/history"
            element={<JournalHistory />}
          />

          <Route
            path="/insights"
            element={<Insights />}
          />
        </Routes>

      </Router>
    </div>
  );
}

export default App;