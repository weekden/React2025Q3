import type { ReactNode } from 'react';
import MainPage from './pages/mainPage';
import AboutPage from './pages/aboutPage';
import { Route, Navigate, Routes } from 'react-router-dom';

import NotFoundPage from './pages/notFoundPage';
import Layout from './layouts/Layout';
import CardDetails from './components/cardDetail/CardDetail';

function App(): ReactNode {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="page/1" replace />} />
        <Route path="page/:page" element={<MainPage />}>
          <Route path="detailsId/:id" element={<CardDetails />} />
        </Route>
        <Route path="about" element={<AboutPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
