const initialState = {
    id: "",
    name: "",
    email: "",
    cpf: "",
    hasAddress: false,
    address: ""
}

const signUp = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_UP': {
            return {
                ...state,
            }
        }
        case ('EDIT_USER'): {
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                cpf: action.payload.cpf,
                hasAddress: action.payload.hasAddress,
                address: action.payload.address
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default signUp