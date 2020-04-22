import axios from 'axios'
import { loginUser } from './Login/actions';
import { push } from "connected-react-router"
import { routes } from "../containers/Router"

const baseURL = 'https://us-central1-missao-newton.cloudfunctions.net/rappi4'

const setAddAddressAction = (userAddress) => {
    return {
        type: "ADD_ADDRESS",
        payload: {
            userAddress
        }
    }
}

export const createAddress = (userAddress) => async (dispatch) => {
    
    console.log(userAddress)
    try {
        const response = await axios.put(`${baseURL}/address`, userAddress,
        {
            headers: { auth: window.localStorage.getItem('token') }
        }
        )
        const { user, token } = response.data
        console.log(user)
        console.log(token)

        window.localStorage.setItem('token', response.data.token)
        // dispatch(loginUser(user, token));

        // dispatch(setAddAddressAction(result.data.userAddress))
        dispatch(push(routes.feedPage))
    }
    catch(error){
        console.log(error)        
        alert("Error ao tentar adicionar endereço!")
    }
}