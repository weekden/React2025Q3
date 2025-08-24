import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../store';
import AppButtonsControll from '../../components/AppButtonsControll/MainButtons';

describe('UncontrolledForm', () => {
  beforeEach(() => {
    const portal = document.createElement('div');
    portal.setAttribute('id', 'portal');
    document.body.append(portal);
  });

  afterEach(() => {
    document.getElementById('portal')?.remove();
  });

  it('should render inputs fields', () => {
    render(
      <Provider store={store}>
        <AppButtonsControll />
      </Provider>
    );

    const buttton = screen.getByRole('button', { name: 'Uncontroll Form' });
    fireEvent.click(buttton);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Choose a profile picture')
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Accept Terms/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeEnabled();
  });

  it('should render error messages after submit', async () => {
    render(
      <Provider store={store}>
        <AppButtonsControll />
      </Provider>
    );

    const buttton = screen.getByRole('button', { name: 'Uncontroll Form' });
    fireEvent.click(buttton);

    const name = screen.getByLabelText('Name');
    fireEvent.change(name);
    expect(screen.queryByText('Enter the name')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => {
      expect(screen.getByText('Enter the name')).toBeInTheDocument();
      expect(screen.getByText('Age must be positive')).toBeInTheDocument();
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
      expect(screen.getByText('Choose the country')).toBeInTheDocument();
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
      expect(screen.getByText('Choose the gender')).toBeInTheDocument();
      expect(screen.getByText('Choose the your avatar')).toBeInTheDocument();
      expect(
        screen.getByText("You did't accept our terms")
      ).toBeInTheDocument();
    });
  });
});
