import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    isButtonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { email, senha } = this.state;
      const tamSenhaMinima = 6;
      const newButtonState = email.includes('@')
      && email.includes('.com')
      && senha.length >= tamSenhaMinima;
      this.setState({ isButtonDisabled: !newButtonState });
    });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    dispatch(addUser(this.state));
    history.push('/carteira');
  };

  render() {
    const { email, senha, isButtonDisabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            name="email"
            id="email"
            type="text"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            name="senha"
            id="senha"
            type="password"
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ senha }
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ isButtonDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
