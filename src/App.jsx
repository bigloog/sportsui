import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Fixtures from "./Fixtures";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fixtures/:teamSlug/:leagueSlug" element={<Fixtures />} />
      </Routes>
    </Router>
  );
}
