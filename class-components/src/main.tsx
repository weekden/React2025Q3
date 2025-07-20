import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Page from './pages/Page.tsx';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.tsx';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <Page></Page>
      </ErrorBoundary>
    </StrictMode>
  );
}
