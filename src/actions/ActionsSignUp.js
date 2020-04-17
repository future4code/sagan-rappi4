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
    
    const token = window.localStorage.getItem('token')
    console.log(userAddress)
    try {
        const result = await axios.put(`${baseURL}/address`, userAddress,
        {
            headers: { auth: token }}
        )
        const { user, token } = result.data
        dispatch(loginUser(user, token));
        dispatch(setAddAddressAction(result.data.userAddress))
        dispatch(push(routes.feedPage))
    }
    catch(error){
        console.log(error)        
        alert("Error ao tentar adicionar endereço!")
    }
}