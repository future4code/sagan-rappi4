const initialState = {
    address : undefined
}

const cart = (state=initialState, action) =>{
    switch(action.type){
        case "SET_ADDRESS": {
            return {
                address: action.payload.address
            }
        }
        default: {
            return state
        }
    }
}

export default cart;