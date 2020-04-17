const initialState = {
    restaurantsList: [],
    restaurantDetailed: {},
    cart: {},
  }
  
  const restaurants = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_RESTAURANTS': {
        return {
          ...state, 
          restaurantsList: action.payload.restaurants
        }
      }

      case 'SET_RESTAURANT': {
        return {
          ...state,
          restaurantDetailed: action.payload.restaurant
        }
      }

      case 'SET_CART': {
        return {
          ...state,
          cart: action.payload.cart
        }
      }

      default:
        return state
    }
  }
  
  export default restaurants
  