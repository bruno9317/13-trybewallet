// Coloque aqui suas actions
export const ADD_USER_INFO = 'ADD_USER_INFO';
export const ADD_WALLET_INFO = 'ADD_WALLET_INFO';
export const ADD_EXPENSE_INFO = 'ADD_EXPENSE_INFO';
export const ADD_TOTAL_INFO = 'ADD_TOTAL_INFO';

export const addUser = (userInfo) => {
  console.log('chamou action1');
  return {
    type: ADD_USER_INFO,
    payload: {
      email: userInfo.email,
    },
  };
};

export const addWallet = (walletInfo) => {
  console.log('chamou action');
  return {
    type: ADD_WALLET_INFO,
    payload: {
      currencies: walletInfo.currencies,
      total: walletInfo.total,
      // expenses: [{
      //   id: walletInfo.id,
      //   value: walletInfo.value,
      //   description: walletInfo.description,
      //   currency: walletInfo.currency,
      //   method: walletInfo.method,
      //   tag: walletInfo.tag,
      // }],
      // ...walletInfo,
    },
  };
};

export const addExpenses = (expenseInfo) => {
  console.log('chamou action');
  return {
    type: ADD_EXPENSE_INFO,
    payload: {
      id: expenseInfo.id,
      value: expenseInfo.value,
      description: expenseInfo.description,
      currency: expenseInfo.currency,
      method: expenseInfo.method,
      tag: expenseInfo.tag,
      // total: expenseInfo.total,
      exchangeRates: expenseInfo.exchangeRates,
    },
  };
};

// export const addTotal = (totalInfo) => {
//   console.log('chamou action');
//   return {
//     type: ADD_TOTAL_INFO,
//     payload: {
//       total: totalInfo.total,
//     },
//   };
// };
