import axios from 'axios'
import { loginUser } from './actions';
import { push } from 'connected-react-router';
import { routes } from '../../containers/Router';

const baseURL = 'https://us-central1-missao-newton.cloudfunctions.net/rappi4';

export const doLogin = (form) => async dispatch => {
  try {
    const loginResponse = await axios.post(`${baseURL}/login`, form);
    const { user, token } = loginResponse.data;
    dispatch(loginUser(user, token));
    if (user.hasAddress) {
      dispatch(push(routes.feedPage));
    } else {
      dispatch(push(routes.informAddressPage));
    }
  } catch(error) {
    alert(error.response.data.message);
  }
}