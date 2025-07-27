import type { ReactNode } from 'react';
import MainPage from './pages/mainPage';
import AboutPage from './pages/aboutPage';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import NotFoundPage from './pages/notFoundPage';

function App(): ReactNode {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
