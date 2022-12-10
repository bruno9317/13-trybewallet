import { ADD_EXPENSE_INFO, ADD_WALLET_INFO } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_WALLET_INFO: {
    return {
      ...state,
      ...action.payload,
    };
  }
  case ADD_EXPENSE_INFO: {
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  }
  default: return state;
  }
};

export default walletReducer;
