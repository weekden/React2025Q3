import { describe, expect, it } from 'vitest';
import { mockRender } from './mocks/data';
import { screen } from '@testing-library/react';

describe('App component routing', () => {
  it(' should redirect "/" to "/page/1" and render MainPage', () => {
    mockRender('/');

    expect(screen.getByTestId('main-container')).toBeInTheDocument();
  });

  it('should render MainPage for /page/:page ', () => {
    mockRender('/page/2');

    expect(screen.getByTestId('main-container')).toBeInTheDocument();
  });

  it('shoul render CardDetails for /page/:page/detailsId/:id ', () => {
    mockRender('/page/1/detailsId/card-1');

    expect(screen.getByTestId('card-details')).toBeInTheDocument();
  });

  it('should render AboutPage for /about', () => {
    mockRender('/about');

    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });

  it('should render NotFoundPage for unknown routes', () => {
    mockRender('/unknown');

    expect(screen.getByText("This page doesn't exist.")).toBeInTheDocument();
  });
});
