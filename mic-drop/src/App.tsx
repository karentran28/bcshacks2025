import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage.tsx'
import LowPage from './pages/LowPage.tsx'
import SongListPage from "./pages/SongListPage.tsx";
import KaraokePage from "./pages/KaraokePage.tsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/low" element={<LowPage />} />
        <Route path="/songList" element={<SongListPage />} />
        <Route path="/karaokePlayer" element={<KaraokePage />} />
      </Routes>
    </Router>
  );
}

export default App;
