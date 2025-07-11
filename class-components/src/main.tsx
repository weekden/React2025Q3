import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Page from './components/pages/Page.tsx';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <Page></Page>
    </StrictMode>
  );
}
