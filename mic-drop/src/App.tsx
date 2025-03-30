import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LowPage from './pages/LowPage.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LowPage />} />
      </Routes>
    </Router>
  );
}

export default App
