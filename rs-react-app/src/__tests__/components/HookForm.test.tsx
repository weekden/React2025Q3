import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { store } from '../../store';
import AppButtonsControll from '../../components/AppButtonsControll/MainButtons';

describe('HookForm ', () => {
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

    const buttton = screen.getByRole('button', { name: 'Hook Form' });
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

    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });

  it('should render error messages when fields are empty', async () => {
    render(
      <Provider store={store}>
        <AppButtonsControll />
      </Provider>
    );

    const buttton = screen.getByRole('button', { name: 'Hook Form' });
    fireEvent.click(buttton);

    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.blur(nameInput);

    const ageInput = screen.getByLabelText('Age');
    fireEvent.change(ageInput, { target: { value: '' } });
    fireEvent.blur(ageInput);

    const emailInput = screen.getByLabelText('E-mail');
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.blur(emailInput);

    const countryInput = screen.getByLabelText('Country');
    fireEvent.change(countryInput, { target: { value: 'Neverland' } });

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.blur(passwordInput);

    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    fireEvent.change(confirmPasswordInput, { target: { value: '' } });
    fireEvent.blur(confirmPasswordInput);

    const genderRadio = screen.getByLabelText('male');
    fireEvent.blur(genderRadio);

    const fileInput = screen.getByLabelText('Choose a profile picture');
    fireEvent.blur(fileInput);

    const termsInput = screen.getByLabelText(/Accept Terms/i);
    fireEvent.blur(termsInput);

    expect(await screen.findByText('Enter the name')).toBeInTheDocument();
    expect(await screen.findByText('Enter your age')).toBeInTheDocument();
    expect(await screen.findByText('Invalid email')).toBeInTheDocument();
    expect(await screen.findByText('Choose the country')).toBeInTheDocument();
    expect(
      await screen.findByText('Passwords do not match')
    ).toBeInTheDocument();
    expect(await screen.findByText('Choose the gender')).toBeInTheDocument();
    expect(
      await screen.findByText(
        'Invalid input: expected file, received undefined'
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText("You did't accept our terms")
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });

  it('should disable error messages when value is correct', async () => {
    render(
      <Provider store={store}>
        <AppButtonsControll />
      </Provider>
    );

    const buttton = screen.getByRole('button', { name: 'Hook Form' });
    fireEvent.click(buttton);

    const name = screen.getByLabelText('Name');
    fireEvent.change(name, { target: { value: '' } });
    fireEvent.blur(name);

    expect(await screen.findByText('Enter the name')).toBeInTheDocument();

    fireEvent.change(name, { target: { value: 'Sam' } });
    fireEvent.blur(name);

    await waitFor(() => {
      expect(screen.queryByText('Enter the name')).not.toBeInTheDocument();
    });
  });
});
