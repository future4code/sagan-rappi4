import axios from 'axios'

const baseUrl = 'https://us-central1-missao-newton.cloudfunctions.net/rappi4'

export const setRestaurant = (restaurant) => {
    return {
        type: 'SET_RESTAURANT',
        payload: {
            restaurant
        }
    }
}

export const setCart = (cart) => {
    return {
        type: 'SET_CART',
        payload: {
            cart
        }
    }
}


export const getRestaurantDetail = (id) => async (dispatch) => {
    const token = window.localStorage.getItem('token')
    
    try {
        const response = await axios.get(
            `${baseUrl}/restaurants/${id}`,
            {
                headers: {
                    auth: token
                }
            }
        )
        const restaurant = response.data.restaurant

        dispatch(setRestaurant(restaurant))

    } catch (error) {
        alert('Erro')
    }
}
