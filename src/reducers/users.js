export const localStorageTag = 'rappi4_data';

const localData = JSON.parse(window.localStorage.getItem(localStorageTag)) || {};

const initialState = {
  user: localData.user,
  token: localData.token,
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'DO_LOGIN':
      const { user, token } = action.payload;
      window.localStorage.setItem(localStorageTag, JSON.stringify({ user, token }));
      return { ...state, user, token }
    case 'DO_LOGOUT':
      window.localStorage.removeItem(localStorageTag);
      return { ...state, user: {}, token: null }
    default:
      return state
  }
}

export default users
