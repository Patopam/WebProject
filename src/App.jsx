import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./screens/dashboard/dashboard";
import Emotions from "./screens/emotions/emotions";
import Finance from "./screens/finance/finance";
import Analytics from "./screens/analytics/analytics";
import Journal from "./screens/journal/journal";
import Calendar from "./screens/calendar/calendar";
import Start from "./screens/start/start";
import Log from "./screens/log/log";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/log" element={<Log />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/emotions" element={<Emotions />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;
