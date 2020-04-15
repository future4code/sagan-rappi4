const initialState = {
    userAddress: [],
  }
  
  const userAddress = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_ADDRESS':
        return {
          ...state, 
          userAddress: action.payload.userAddress
        }
        case 'EDIT_ADDRESS':
            return {
              ...state, 
              userAddress: action.payload.userAddress
            }
      default:
        return state
    }
  }
  
  export default userAddress