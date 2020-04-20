const initialState = {
    currentPage : "feed",
    showMenu: false,
    orderProgress: null
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
        case "SET_ORDER_PROGRESS": {
            console.log(action.payload.orderProgress)
            return {
                ...state,
                orderProgress: action.payload.orderProgress
            }
        }
        default: {
            return state
        }
    }
}
export default menu
