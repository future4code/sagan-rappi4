const initialState = {
    restaurants: [],
    restaurantDetailed: {},
}

const restaurant = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_RESTAURANT': {
            return {
                ...state,
                restaurantDetailed: action.payload.restaurant
            }
        }; 

        default:
            return state;

    }
}

export default restaurant;