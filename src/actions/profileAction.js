import axios from 'axios'
import { push } from "connected-react-router";
import { routes } from "../containers/Router"

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4/";

export const setProfile = (profile) => {
    return {
        type: "SET_PROFILE",
        payload: {
            profile: profile
        }
    }
}

export const setOrdersHistory = (orders) => {
    return {
        type: "SET_ORDERS_HISTORY",
        payload: {
            orders: orders
        }
    }
}

export const getProfile = (token) => async (dispatch) => {
    try {
        const response = await axios.get(`${baseUrl}profile`, { headers: { auth: token } })
        dispatch(setProfile(response.data))
    }
    catch (error) {
        console.error(error)
    }
}

export const getOrdersHistory = (token) => async (dispatch) => {
    try {
        const response = await axios.get(`${baseUrl}orders/history`, { headers: { auth: token } })
        dispatch(setOrdersHistory(response.data.orders))
    }
    catch (error) {
        console.error(error)
    }
}