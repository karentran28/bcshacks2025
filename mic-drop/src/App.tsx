<<<<<<< HEAD
// import { useState } from 'react'
import "./App.css";

import LandingPage from "./pages/LandingPage.tsx";
import SongListPage from "./pages/SongListPage.tsx";

function App() {
  return (
    <>
      <SongListPage />
    </>
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage.tsx'
import LowPage from './pages/LowPage.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/low" element={<LowPage />} />
      </Routes>
    </Router>
>>>>>>> 069bd0f94ac3c635a3131276f2671a9332642305
  );
}

export default App;
