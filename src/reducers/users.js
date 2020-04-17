export const localStorageTag = 'rappi4_data';

const localData = JSON.parse(window.localStorage.getItem(localStorageTag)) || {};
const token = window.localStorage.getItem("token");

const initialState = {
  user: localData.user,
  token: localData.token || token,
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'DO_LOGIN':
      const { user, token } = action.payload;
      window.localStorage.setItem(localStorageTag, JSON.stringify({ user, token }));
      window.localStorage.setItem("token", token);
      return { ...state, user, token }
    case 'DO_LOGOUT':
      window.localStorage.removeItem(localStorageTag);
      window.localStorage.removeItem("token");
      return { ...state, user: {}, token: null }
    default:
      return state
  }
}

export default users
