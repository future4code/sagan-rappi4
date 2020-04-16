const initialState = {
    currentPage : "feed",
    showMenu: false
}

const menu = (state=initialState, action) =>{
    switch(action.type){
        case "SET_CURRENT_PAGE": {
            return {
                ...state,
                currentPage: action.payload.currentPage
            }
        }
        case "SET_SHOW_MENU": {
            return {
                ...state,
                showMenu: action.payload.show
            }
        }
        default: {
            return state
        }
    }
}
export default menu
