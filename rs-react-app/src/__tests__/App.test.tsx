import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../store';
import App from '../App';

describe('App component', () => {
  it('should render App', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Uncontroll Form')).toBeInTheDocument();
    expect(screen.getByText('Hook Form')).toBeInTheDocument();
  });
});
