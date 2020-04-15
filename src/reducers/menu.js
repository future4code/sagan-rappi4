const initialState = {
    currentPage : "feed"
}

const menu = (state=initialState, action) =>{
    switch(action.type){
        case "SET_CURRENT_PAGE": {
            return {
                currentPage: action.payload.currentPage
            }
        }
        default: {
            return state
        }
    }
}
export default menu
