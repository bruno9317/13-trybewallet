import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEditorCondition, addNewExpenses, addWallet } from '../redux/actions';

class Table extends Component {
  state = {
    total: 0,
    editor: false,
    idToEdit: 0,
  };

  componentDidMount() {
    const { total, dispatch } = this.props;
    console.log(total);
    this.setState({ total }, () => {
      // console.log(this.state);
      dispatch(addWallet(this.state));
    });
  }

  handleClick = (e) => {
    const { expenses, dispatch } = this.props;
    const { target } = e;
    let soma = 0;
    const newa = expenses.filter((p) => (
      p.id !== parseInt(target.parentNode.parentNode.id, 10)));
    const valConvert = newa.map((p) => (
      Object.entries(p.exchangeRates).find((f) => f[0] === p.currency)[1].ask * p.value));
    for (let index = 0; index < newa.length; index += 1) {
      newa[index].id = index;
      soma += valConvert[index];
    }
    dispatch(addNewExpenses(newa));
    // console.log(valConvert);
    this.setState({ total: soma }, () => {
      dispatch(addWallet(this.state));
    });
  };

  handleEditClick = (event) => {
    const { dispatch } = this.props;
    const { id } = event.target.parentNode.parentNode;
    this.setState({ editor: true, idToEdit: parseInt(id, 10) }, () => {
      // console.log(this.state);
      dispatch(addEditorCondition(this.state));
    });
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th scope="col" data-testid="thValue">Valor</th>
            <th scope="col" data-testid="thDescription">Descrição</th>
            <th scope="col" data-testid="thCurrency">Moeda</th>
            <th scope="col" data-testid="thMethod">Método de pagamento</th>
            <th scope="col" data-testid="thTag">Tag</th>
            <th scope="col" data-testid="thCambio">Câmbio utilizado</th>
            <th scope="col" data-testid="thConverse">Valor convertido</th>
            <th scope="col" data-testid="thCoin">Moeda de conversão</th>
            <th scope="col" data-testid="thButtons">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((p) => (
            <tr key={ p.id } id={ p.id }>
              <td data-testid="tdVal">{ parseFloat(p.value).toFixed(2) }</td>
              <td data-testid={ `${p.id}-tdDescrip` }>{ p.description }</td>
              <td data-testid={ `${p.id}-tdSeiLa` }>
                { Object.entries(p.exchangeRates).find((e) => (
                  e[0] === p.currency))[1].name }
              </td>
              <td data-testid={ `${p.id}-tdMethod` }>{ p.method }</td>
              <td data-testid={ `${p.id}-tdTag` }>{ p.tag }</td>
              <td data-testid={ `${p.id}-tdSeiLa2` }>
                { parseFloat(Object.entries(p.exchangeRates).find((e) => (
                  e[0] === p.currency))[1].ask).toFixed(2) }
              </td>
              <td data-testid={ `${p.id}-tdSeiLa3` }>
                { parseFloat(Object.entries(p.exchangeRates).find((e) => (
                  e[0] === p.currency))[1].ask * p.value).toFixed(2) }
              </td>
              <td data-testid={ `${p.id}-tdBRLFixo` }>BRL</td>
              <td>
                <button
                  type="button"
                  onClick={ this.handleEditClick }
                  data-testid="edit-btn"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={ this.handleClick }
                  data-testid="delete-btn"
                >
                  Deletar
                </button>
              </td>
            </tr>)) }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({})])).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Table);
