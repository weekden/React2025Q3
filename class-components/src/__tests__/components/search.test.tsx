import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import Search from '../../components/search/Search';

describe('Search component', () => {
  beforeEach(() => {
    const store: Record<string, string> = {};

    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
    });
  });

  it('render component search input and button', () => {
    render(<Search onQueryChange={() => {}} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('should display previously saved search term from localStorage on mount', () => {
    localStorage.setItem('search', 'Local Storage test value');
    render(<Search onQueryChange={() => {}} />);
    expect(screen.getByRole('searchbox')).toHaveValue(
      'Local Storage test value'
    );
  });

  it('should show empty input when no saved term exists', () => {
    render(<Search onQueryChange={() => {}} />);
    expect(screen.getByRole('searchbox')).toHaveValue('');
  });

  it('should update input value when user types', () => {
    render(<Search onQueryChange={() => {}} />);
    const input = screen.getByRole<HTMLInputElement>('searchbox');
    fireEvent.change(input, { target: { value: 'Flaxel' } });
    expect(input.value).toBe('Flaxel');
  });

  it('should save and trim search value term to localStorage when search button is clicked', () => {
    render(<Search onQueryChange={() => {}} />);
    const button = screen.getByRole<HTMLButtonElement>('button', {
      name: 'Search',
    });
    const input = screen.getByRole<HTMLInputElement>('searchbox');
    fireEvent.change(input, { target: { value: '  Carben  ' } });
    fireEvent.click(button);
    expect(localStorage.setItem).toHaveBeenCalledWith('search', 'Carben');
  });

  it('should overwrite existing localStorage value when new search is performed', () => {
    render(<Search onQueryChange={() => {}} />);
    const input = screen.getByRole<HTMLInputElement>('searchbox');
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'Carben' } });
    fireEvent.click(button);
    expect(localStorage.setItem).toHaveBeenLastCalledWith('search', 'Carben');

    fireEvent.change(input, { target: { value: 'Flaxel' } });
    fireEvent.click(button);
    expect(localStorage.setItem).toHaveBeenLastCalledWith('search', 'Flaxel');
  });

  it('should call onQueryChange("") when input is only spaces', () => {
    const onQueryChange = vi.fn();
    render(<Search onQueryChange={onQueryChange} />);
    const input = screen.getByRole<HTMLInputElement>('searchbox');
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.click(button);
    fireEvent.change(input, { target: { value: '   ' } });

    expect(onQueryChange).toHaveBeenCalledWith('');
  });
});
