import axios from 'axios';
import { push } from 'connected-react-router';
import { routes } from '../containers/Router';
import { loginUser } from './Login/actions';

const baseUrl = 'https://us-central1-missao-newton.cloudfunctions.net/rappi4'

export const signUp = (formData) => async (dispatch) => { 
    const { name, email, cpf, password, confirmPassword } = formData

    const data = {
        'name': name,
        'email': email,
        'cpf': cpf,
        'password': password, 
        'confirmPassword': confirmPassword
    }

    try {
        const response = await axios.post(`${baseUrl}/signup`, data)

        const token = response.data.token;

        window.localStorage.setItem('token', token)
        
        const {user} = response.data

        dispatch(loginUser(user, token))
        dispatch(setSignUp(response.data))
        dispatch(push(routes.informAddressPage)) 
        
    } catch (error) {
        const message = error.response && error.response.data ? error.response.data.message : 'Por favor, tente novamente.'
        alert(message)
    }
} 

export const setSignUp = (formData) => {
    return {
        type: 'SIGN_UP',
        payload: formData
    }
}