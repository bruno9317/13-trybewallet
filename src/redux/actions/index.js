// Coloque aqui suas actions
export const ADD_USER_INFO = 'ADD_USER_INFO';
export const ADD_WALLET_INFO = 'ADD_WALLET_INFO';

export const addUser = (userInfo) => {
  console.log('chamou action');
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
      ...walletInfo,
    },
  };
};
