// redux/reducers/userReducer.js
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/userActions';

const initialState = {
  token: null,
  user: null,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        error: null
      };
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        error: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
        error: null
      };
    default:
      return state;
  }
};

export default userReducer;
