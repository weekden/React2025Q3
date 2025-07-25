import type { ReactNode } from 'react';
import MainPage from './pages/mainPage';
import AboutPage from './pages/aboutPage';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';

function App(): ReactNode {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
