import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResultTable from '../../components/ResultTable/ResultTable';
import { Provider } from 'react-redux';
import formReducer from '../../store/formSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('ResultTable', () => {
  it('should render table with results submit', () => {
    const mockData = [
      {
        name: 'Den',
        age: 25,
        gender: 'male',
        email: 'Den@example.com',
        country: 'Canada',
        password: 'qwQw12!@',
        confirmPassword: 'qwQW12!@',
        avatar: 'avatar.png',
        terms: true,
      },
    ];

    const store = configureStore({
      reducer: { formData: formReducer },
      preloadedState: { formData: { data: mockData } },
    });

    render(
      <Provider store={store}>
        <ResultTable />
      </Provider>
    );

    const table = screen.getByTestId('form-data-table');
    expect(table).toBeInTheDocument();
    expect(screen.getByText('Den')).toBeInTheDocument();
    expect(screen.getByAltText('avatar')).toBeInTheDocument();
  });
});
