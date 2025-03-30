// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from './pages/LandingPage.tsx'
// import LowPage from './pages/LowPage.tsx'

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/low" element={<LowPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

//--------------------------------------------------------
// INCASE WE WANT TO ADD GLOBAL MUSIC
//--------------------------------------------------------
//App.tsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import LowPage from './pages/LowPage';
import GlobalMusic from './components/GlobalMusic';
import HighPage from './pages/HighPage';
import SongListPage from './pages/SongListPage.tsx';
import KaraokePage from './pages/KaraokePage.tsx';
function App() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <Router>
      <GlobalMusic isRecording={isRecording} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/low" element={<LowPage setIsRecording={setIsRecording} />} />
        <Route path="/high" element={<HighPage setIsRecording={setIsRecording} />} /> {/* <-- this one */}
        <Route path="/list" element={<SongListPage/>} />
        <Route path="/player" element={<KaraokePage setIsRecording={setIsRecording} />} />

      </Routes>
    </Router>
  );
}

 export default App;
