const initialState = {
    profile : undefined,
    orders: undefined
}

const profile = (state=initialState, action) =>{
    switch(action.type){
        case "SET_PROFILE": {
            return {
                ...state,
                profile: action.payload.profile
            }
        }
        case "SET_ORDERS_HISTORY": {
            return {
                ...state,
                orders: action .payload.orders
            }
        }
        default: {
            return state
        }
    }
}

export default profile;