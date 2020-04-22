const initialState = {
    idRestaurant : undefined
}

const feed = (state=initialState, action) =>{
    switch(action.type){
        case "SET_ID": {
            return {
                idRestaurant: action.payload.idRestaurant
            }
        }
        default: {
            return state
        }
    }
}

export default feed;