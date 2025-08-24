import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import AppButtonsControll from '../../components/AppButtonsControll/MainButtons';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('AppButtonsControll + Popup', () => {
  beforeEach(() => {
    const portal = document.createElement('div');
    portal.setAttribute('id', 'portal');
    document.body.append(portal);
  });

  afterEach(() => {
    document.getElementById('portal')?.remove();
  });

  it('should render buttons on MainPage', () => {
    render(
      <Provider store={store}>
        <AppButtonsControll />
      </Provider>
    );
    expect(screen.getByText('Uncontroll Form')).toBeInTheDocument();
    expect(screen.getByText('Hook Form')).toBeInTheDocument();
  });

  it('should render UncontrolledForm', async () => {
    render(
      <Provider store={store}>
        <AppButtonsControll />
      </Provider>
    );
    const buttton = screen.getByRole('button', { name: 'Uncontroll Form' });
    fireEvent.click(buttton);

    const popup = screen.getByTestId('popup-form');
    expect(popup).toBeInTheDocument();
    expect(screen.getByText('UNCONTROLL FORM')).toBeInTheDocument();
  });

  it('should render HookForm', () => {
    render(
      <Provider store={store}>
        <AppButtonsControll />
      </Provider>
    );
    const buttton = screen.getByRole('button', { name: 'Hook Form' });
    fireEvent.click(buttton);

    const popup = screen.getByTestId('popup-form');
    expect(popup).toBeInTheDocument();
    expect(screen.getByText('HOOK FORM')).toBeInTheDocument();
  });

  it('should close popup after click by X', () => {
    render(
      <Provider store={store}>
        <AppButtonsControll />
      </Provider>
    );
    const buttton = screen.getByRole('button', { name: 'Hook Form' });
    fireEvent.click(buttton);

    const popup = screen.getByTestId('popup-form');
    const closeButton = screen.getByRole('button', { name: 'X' });
    fireEvent.click(closeButton);

    expect(popup).not.toBeInTheDocument();
  });

  it('should close popup after click by overlay', () => {
    render(
      <Provider store={store}>
        <AppButtonsControll />
      </Provider>
    );
    const buttton = screen.getByRole('button', { name: 'Uncontroll Form' });
    fireEvent.click(buttton);

    const overlay = screen.getByTestId('overlay');
    const popup = screen.getByTestId('popup-form');
    fireEvent.click(overlay);
    expect(popup).not.toBeInTheDocument();
  });

  it('should not close popup if event click was inside', () => {
    render(
      <Provider store={store}>
        <AppButtonsControll />
      </Provider>
    );
    const buttton = screen.getByRole('button', { name: 'Uncontroll Form' });
    fireEvent.click(buttton);

    const popup = screen.getByTestId('popup-form');
    fireEvent.click(popup);
    expect(popup).toBeInTheDocument();
  });

  it('should close popup after press the Esc', () => {
    render(
      <Provider store={store}>
        <AppButtonsControll />
      </Provider>
    );
    const buttton = screen.getByRole('button', { name: 'Uncontroll Form' });
    fireEvent.click(buttton);

    const popup = screen.getByTestId('popup-form');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(popup).not.toBeInTheDocument();
  });
});
