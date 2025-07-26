import type { ReactNode } from 'react';
import MainPage from './pages/mainPage';
import AboutPage from './pages/aboutPage';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';

function App(): ReactNode {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path=":page" element={<MainPage />} />
        <Route path=":page/:detailsId" element={<MainPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
