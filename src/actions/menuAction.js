import axios from 'axios'
import { push } from "connected-react-router";
import { routes } from "../containers/Router"

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/rappi4/";

export const setCurrentPage = (currentPage) => {
    return {
        type: "SET_CURRENT_PAGE",
        payload: {
            currentPage
        }
    }
}

export const setShowMenu = (show) => {
    return {
        type: 'SET_SHOW_MENU',
        payload: {
            show
        }
    }
}

export const setOrderProgress = (orderProgress) => {
    return {
        type: "SET_ORDER_PROGRESS",
        payload: {
            orderProgress
        }
    }
}

export const getOrderProgress = (token) => async (dispatch) => {
    try {
        const response = await axios.get(`${baseUrl}active-order`, { headers: { auth: token } })
        // console.log(response.data.order)
        dispatch(setOrderProgress(response.data.order))
    }
    catch (error) {
        console.error(error)
    }
}
