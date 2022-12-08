import { ADD_USER_INFO } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER_INFO: {
    return {
      ...state,
      ...action.payload,
    };
  }
  default: return state;
  }
};

export default userReducer;
