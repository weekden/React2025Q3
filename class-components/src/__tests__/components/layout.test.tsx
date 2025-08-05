import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Layout from '../../layouts/Layout';

describe('Layout component', () => {
  it('should render header and content via Outlet', () => {
    render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="test"
              element={<main data-testid="main-content">Content</main>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('header-nav')).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
  });
});
