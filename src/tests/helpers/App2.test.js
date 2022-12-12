import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';
import Wallet from '../../pages/Wallet';
// import { screen }

describe('testa', () => {
  test('', () => {
    const { history } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'],
      initialState: {
        wallet: {
          currencies: ['USD'],
          expenses: [
            {
              id: 0,
              value: 3,
              currency: 'USD',
              method: 'Dinheiro',
              tag: 'Alimentação',
              exchangeRates: {
                USD: {
                  ask: '5.24',
                },
              },
            },
          ],
          editor: false,
          idToEdit: 0,
          total: 15.7227,
        } } });
    expect(history.location.pathname).toBe('/carteira');
    const um = screen.getByTestId('tdVal');
    const dois = screen.getByTestId('0-tdDescrip');
    const tres = screen.getByTestId('0-tdSeiLa');
    const quatro = screen.getByTestId('0-tdMethod');
    const cinco = screen.getByTestId('0-tdTag');
    const seis = screen.getByTestId('0-tdSeiLa2');
    const sete = screen.getByTestId('0-tdSeiLa3');
    const oito = screen.getByTestId('0-tdBRLFixo');
    const buttonEdit = screen.getByTestId('edit-btn');

    expect(um).toBeInTheDocument();
    expect(dois).toBeInTheDocument();
    expect(tres).toBeInTheDocument();
    expect(quatro).toBeInTheDocument();
    expect(cinco).toBeInTheDocument();
    expect(seis).toBeInTheDocument();
    expect(sete).toBeInTheDocument();
    expect(oito).toBeInTheDocument();
    expect(buttonEdit).toBeInTheDocument();

    userEvent.click(buttonEdit);

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const edit = screen.getByRole('button', { name: 'Editar despesa' });

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(edit).toBeInTheDocument();

    userEvent.type(valueInput, '0');
    userEvent.type(descriptionInput, 'asfaf');

    userEvent.click(edit);
  });
});
