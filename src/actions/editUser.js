import axios from 'axios';
import { routes } from '../containers/Router';
import { push } from "connected-react-router";

const baseUrl = 'https://us-central1-missao-newton.cloudfunctions.net/rappi4'

export const requestEditUser = (formData) => async (dispatch) => {
    
    const data = {
        "name": formData.name,
        "cpf": formData.cpf,
        "email": formData.email
    }

    try {
        const result = await axios.put(`${baseUrl}/profile`, data, 
        {
            headers: { auth:localStorage.getItem(`token`) }
        }) 
        dispatch(editUser(result))
        dispatch(push(routes.profilePage))
    }
    catch (error){
        alert('Erro ao tentar editar cadastro!')
        console.log(error)
    }
}

export const editUser = (payload) => {
    return {
        type: 'EDIT_USER',
        payload
    }
}