import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import Login from '../../pages/Login';
import Wallet from '../../pages/Wallet';
// import getCoins from '../../services/api';

describe('Login', () => {
  const emailtestid = 'email-input';
  const passowrdtestid = 'password-input';
  test('Verifica se a tela de login é renderizada', () => {
    renderWithRouterAndRedux(<Login />);

    const loginInput = screen.getByTestId(emailtestid);
    const passwordInput = screen.getByTestId(passowrdtestid);
    const entrarButton = screen.getByRole('button', { name: 'Entrar' });

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(entrarButton).toBeInTheDocument();
  });

  test('verifica se botão ativa', () => {
    renderWithRouterAndRedux(<Login />);

    const emailMock = 'alguem@email.com';
    const passowrdMock = '123456789';

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const entrarButton = screen.getByRole('button', { name: 'Entrar' });

    expect(entrarButton).toBeDisabled();

    userEvent.type(emailInput, emailMock);
    userEvent.type(passwordInput, passowrdMock);

    expect(entrarButton).not.toBeDisabled();
  });

  test('verifica', () => {
    renderWithRouterAndRedux(<Login />);

    const emailMock = 'alguem@email.com';
    const passowrdMock = '1234ald6789';

    const emailInput = screen.getByTestId(emailtestid);
    const passwordInput = screen.getByTestId(passowrdtestid);
    const entrarButton = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(emailInput, emailMock);
    userEvent.type(passwordInput, passowrdMock);

    expect(entrarButton).not.toBeDisabled();

    userEvent.click(entrarButton);
  });
});

describe('wallet', () => {
  test('se renderiza header', () => {
    renderWithRouterAndRedux(<Wallet />);

    const headerEmail = screen.getByTestId('email-field');
    const headerTotal = screen.getByTestId('total-field');
    const headerCurrency = screen.getByTestId('header-currency-field');

    expect(headerEmail).toBeInTheDocument();
    expect(headerTotal).toBeInTheDocument();
    expect(headerCurrency).toBeInTheDocument();
  });

  test('se renderiza form', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });

  test('table', () => {
    renderWithRouterAndRedux(<Wallet />);

    const thValue = screen.getByTestId('thValue');
    const thDescription = screen.getByTestId('thDescription');
    const thCurrency = screen.getByTestId('thCurrency');
    const thMethod = screen.getByTestId('thMethod');
    const thTag = screen.getByTestId('thTag');
    const thCambio = screen.getByTestId('thCambio');
    const thConverse = screen.getByTestId('thConverse');
    const thCoin = screen.getByTestId('thCoin');
    const thButtons = screen.getByTestId('thButtons');

    expect(thValue).toBeInTheDocument();
    expect(thDescription).toBeInTheDocument();
    expect(thCurrency).toBeInTheDocument();
    expect(thMethod).toBeInTheDocument();
    expect(thTag).toBeInTheDocument();
    expect(thCambio).toBeInTheDocument();
    expect(thConverse).toBeInTheDocument();
    expect(thCoin).toBeInTheDocument();
    expect(thButtons).toBeInTheDocument();
  });

  test('usa form', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const expenseButton = screen.getByRole('button', { name: 'Adicionar despesa' });

    userEvent.click(expenseButton);

    const um = screen.getByTestId('tdVal');
    // const dois = screen.getByTestId('0-tdDescrip');
    // const tres = screen.getByTestId('0-tdSeiLa');
    // const quatro = screen.getByTestId('0-tdMethod');
    // const cinco = screen.getByTestId('0-tdTag');
    // const seis = screen.getByTestId('0-tdSeiLa2');
    // const sete = screen.getByTestId('0-tdSeiLa3');
    // const oito = screen.getByTestId('0-tdBRLFixo');

    expect(um).toBeInTheDocument();
    // expect(dois).toBeInTheDocument();
    // expect(tres).toBeInTheDocument();
    // expect(quatro).toBeInTheDocument();
    // expect(cinco).toBeInTheDocument();
    // expect(seis).toBeInTheDocument();
    // expect(sete).toBeInTheDocument();
    // expect(oito).toBeInTheDocument();
  });
});
