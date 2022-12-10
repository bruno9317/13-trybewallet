import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    // console.log(expenses[0]);
    return (
      <table>
        <thead>
          <tr>
            {/* <th scope="col">{expenses[0]}</th> */}
            {/* <th scope="col">id</th> */}
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
            <tr key={ p.id }>
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
            </tr>)) }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // expansesTam: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({})])).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
