const initialState = {
    restaurantsList: [],
  }
  
  const restaurants = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_RESTAURANTS':
        return {
          ...state, restaurantsList: action.payload.restaurants
        }
      default:
        return state
    }
  }
  
  export default restaurants
  