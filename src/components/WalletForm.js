import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, addWallet } from '../redux/actions';
import { getCoins } from '../services/api';

class WalletForm extends Component {
  state = {
    currencies: [],
    id: '',
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: '',
    total: 0,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const receba = await getCoins();
    const coinList2 = Object.keys(receba).filter((p) => p !== 'USDT');
    this.setState({ currencies: coinList2 }, () => {
      dispatch(addWallet(this.state));
    });
  }

  handleSoma = () => {
    const { expanses, dispatch } = this.props;
    // console.log(expanses);
    const aqui = expanses;
    const valConvert = aqui.map((p) => (
      Object.entries(p.exchangeRates).find((e) => e[0] === p.currency)[1].ask * p.value));
    let soma = 0;
    for (let index = 0; index < valConvert.length; index += 1) {
      soma += valConvert[index];
      // console.log('oi');
    }
    this.setState({ total: soma }, () => {
      dispatch(addWallet(this.state));
    });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { dispatch, expansesTam } = this.props;
    const receba = await getCoins();
    this.setState({ id: expansesTam, exchangeRates: receba }, () => {
      dispatch(addExpenses(this.state));
      this.setState({
        id: '',
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: '',
      }, () => {
        this.handleSoma();
      });
    });
  };

  render() {
    const {
      currencies,
      currency,
      value,
      description,
      method,
      tag,
    } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            name="value"
            id="value"
            type="number"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            id="description"
            type="text"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="select">
          Moeda:
          <select
            name="currency"
            id="select"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((p) => (
              <option key={ p } value={ p } name={ p }>
                {p}
              </option>)) }
          </select>
        </label>
        <label htmlFor="select2">
          Método de pagamento:
          <select
            name="method"
            id="select2"
            value={ method }
            onChange={ this.handleChange }
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
            name="tag"
            id="select3"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expansesTam: PropTypes.number.isRequired,
  expanses: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({})])).isRequired,
};

const mapStateToProps = (state) => ({
  expansesTam: state.wallet.expenses.length,
  expanses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
