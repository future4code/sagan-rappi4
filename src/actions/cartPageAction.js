import axios from 'axios'
import { push } from "connected-react-router";
import { routes } from "../containers/Router"

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4/";

export const setAddress = (address) => {
    return {
        type: "SET_ADDRESS",
        payload: {
            address
        }
    }
}

export const getAddress = (token) => async (dispatch) => {
    try {
        const response = await axios.get(`${baseUrl}profile/address`, { headers: { auth: token } })
        dispatch(setAddress(response.data.address))
    }
    catch (error) {
        console.error(error)
    }
}

export const getOrder = (token) => async (dispatch) => {
    try {
        const response = await axios.get(`${baseUrl}active-order`, { headers: { auth: token } })
    }
    catch (error) {
        console.error(error)
    }
}

export const placeOrder = (token, restaurantId, products, paymentMethod) => async (dispatch) => {
    const productsData = products.map(prod=>{
        return({
            id: prod.product.id,
            quantity: prod.quantity
        })
    })
    console.log(paymentMethod)
    const placeOrderData = {
        products: productsData,
        paymentMethod : paymentMethod
    }
    try {
        const response = await axios.post(`${baseUrl}restaurants/${restaurantId}/order`, placeOrderData, { headers: { auth: token } })
        dispatch(push(routes.root))
    }
    catch (error) {
        console.error(error)
    }
}