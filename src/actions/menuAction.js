export const setCurrentPage = (currentPage) => {
    return {
        type: "SET_CURRENT_PAGE",
        payload: {
            currentPage
        }
    }
}

export const setShowMenu = (show) => {
    return {
        type: 'SET_SHOW_MENU',
        payload: {
            show
        }
    }
}