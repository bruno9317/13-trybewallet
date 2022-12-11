import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEditorCondition, addNewExpenses, addWallet } from '../redux/actions';
import { getCoins } from '../services/api';

class EditForm extends Component {
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
    editor: false,
    idToEdit: 0,
    // total: 0,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const receba = await getCoins();
    const coinList2 = Object.keys(receba).filter((p) => p !== 'USDT');
    this.setState({ currencies: coinList2 }, () => {
      dispatch(addWallet(this.state));
    });
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { dispatch, expenses, idToEdit } = this.props;
    const { value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    let soma = 0;
    expenses[idToEdit].value = value;
    expenses[idToEdit].description = description;
    expenses[idToEdit].currency = currency;
    expenses[idToEdit].method = method;
    expenses[idToEdit].tag = tag;
    // console.log(expenses);
    dispatch(addNewExpenses(expenses));
    const valConvert = expenses.map((p) => (
      Object.entries(p.exchangeRates).find((f) => f[0] === p.currency)[1].ask * p.value));
    console.log(valConvert);
    for (let index = 0; index < valConvert.length; index += 1) {
      soma += valConvert[index];
    }
    this.setState({ total: soma }, () => {
      dispatch(addWallet(this.state));
      dispatch(addEditorCondition(this.state));
    });
    // dispatch(addEditorCondition(this.state));
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
        <button type="button" onClick={ this.handleClick }>Editar despesa</button>
      </form>
    );
  }
}

EditForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  })])).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(EditForm);
