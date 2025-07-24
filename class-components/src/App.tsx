import type { ReactNode } from 'react';
import MainPage from './pages/mainPage';
import AboutPage from './pages/aboutPage';
import { Routes, Route } from 'react-router-dom';

function App(): ReactNode {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;
