import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import About from '../../pages/aboutPage';

describe('AboutPage', () => {
  it('should render AboutPage', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const linkToSchool = screen.getByTestId('rs-school-link');
    expect(screen.getByText('Zelda Store')).toBeInTheDocument();
    expect(linkToSchool).toBeInTheDocument();
    expect(linkToSchool).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });
});
