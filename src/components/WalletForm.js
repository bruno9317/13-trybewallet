import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addWallet } from '../redux/actions';
import { getCoins } from '../services/api';

class WalletForm extends Component {
  state = { currencies: [] };

  async componentDidMount() {
    const { dispatch } = this.props;
    const receba = await getCoins();
    const coinList2 = Object.keys(receba).filter((p) => p !== 'USDT');
    this.setState({ currencies: coinList2 }, () => {
      dispatch(addWallet(this.state));
    });
  }

  render() {
    const { currencies } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            name="value"
            id="value"
            type="number"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            id="description"
            type="text"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="select">
          Moeda:
          <select
            name="select"
            id="select"
            data-testid="currency-input"
          >
            { currencies.map((p) => (
              <option key={ p } value={ p }>
                {p}
              </option>)) }
          </select>
        </label>
        <label htmlFor="select2">
          Método de pagamento:
          <select
            name="select2"
            id="select2"
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="select3">
          Categoria:
          <select
            name="select3"
            id="select3"
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(WalletForm);
