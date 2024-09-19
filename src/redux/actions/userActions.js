export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    // Make API call to login
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'USER_LOGIN_FAILURE', payload: error.message });
  }
};
