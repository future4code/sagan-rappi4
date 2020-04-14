import axios from 'axios';

const baseUrl = 'https://us-central1-missao-newton.cloudfunctions.net/rappi4'

export const setRestaurant = (restaurant) => {
    return {
        type: 'SET_RESTAURANT',
        payload: {
            restaurant
        }
    }
}


export const getRestaurantDetail = (id) => async (dispatch) => {
    /* const token = window.localStorage.getItem('token') */
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImdhVmRYd1RSSms2MWJyMThHMHBtIiwibmFtZSI6IkZ1bGFubyIsImVtYWlsIjoiZnVsYW5vQGdtYWlsLmNvbSIsImNwZiI6IjExMS4yMjIuMzMzLTExIiwiaGFzQWRkcmVzcyI6dHJ1ZSwiYWRkcmVzcyI6IlIuIEFmb25zbyBCcmF6LCAxNzcsIDcxIC0gVmlsYSBOLiBDb25jZWnDp8OjbyIsImlhdCI6MTU4Njc5NzY3NX0.4ztoLx6x3H5Ex0R4a5Msh2OvGEfEqR2RTTziRTWib3k"
    
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