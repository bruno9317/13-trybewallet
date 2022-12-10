import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  render() {
    const { email, total } = this.props;

    return (
      <form className="full-form">
        <h2 data-testid="email-field">{ email }</h2>
        <div>
          <h3 data-testid="total-field">{ total.toFixed(2) }</h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </div>
      </form>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);
