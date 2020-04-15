export const loginUser = (user, token) => ({
  type: 'DO_LOGIN',
  payload: {
    user,
    token,
  }
});

export const logoutUser = () => ({
  type: 'DO_LOGOUT',
});