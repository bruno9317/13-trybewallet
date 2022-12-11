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
            <th scope="col">Valor</th>
            <th scope="col">Descrição</th>
            <th scope="col">Moeda</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Tag</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((p) => (
            <tr key={ p.id } id={ p.id }>
              <td>{ parseFloat(p.value).toFixed(2) }</td>
              <td>{ p.description }</td>
              <td>
                { Object.entries(p.exchangeRates).find((e) => (
                  e[0] === p.currency))[1].name }
              </td>
              <td>{ p.method }</td>
              <td>{ p.tag }</td>
              <td>
                { parseFloat(Object.entries(p.exchangeRates).find((e) => (
                  e[0] === p.currency))[1].ask).toFixed(2) }
              </td>
              <td>
                { parseFloat(Object.entries(p.exchangeRates).find((e) => (
                  e[0] === p.currency))[1].ask * p.value).toFixed(2) }
              </td>
              <td>BRL</td>
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
