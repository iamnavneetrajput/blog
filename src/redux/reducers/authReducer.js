import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/types';

const initialState = {
  user: null,
  token: null,
  loading: false,
  message: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, message: '' };
    case LOGIN_SUCCESS:
      return { 
        ...state, 
        user: action.payload.user, 
        token: action.payload.token, 
        loading: false, 
        message: 'Login successful' 
      };
    case LOGIN_FAILURE:
      return { 
        ...state, 
        loading: false, 
        message: action.payload.message 
      };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export default authReducer;
