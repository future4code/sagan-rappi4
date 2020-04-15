import axios from "axios"
import { push } from "connected-react-router"
import { routes } from "../containers/Router"

const baseURL = 'https://us-central1-missao-newton.cloudfunctions.net/rappi4'
const baseAuth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFhSzlGQVZ2QkttUGVhMkFHdnN0IiwibmFtZSI6IlZpdG9yTG9wZXMiLCJlbWFpbCI6ImxvcGVzc3NickBnbWFpbC5jb20iLCJjcGYiOiI5OTkuOTk5Ljk5OS05OSIsImhhc0FkZHJlc3MiOnRydWUsImFkZHJlc3MiOiJSLiBBZm9uc28gQnJheiwgMTc3LCA3MiAtIFZpbGEgTi4gQ29uY2Vpw6fDo28iLCJpYXQiOjE1ODY4MTA1NjZ9.pMdUEWJYQiqNxjIE2nczcECA5mnUaJ3OvEdZHuuPS4Q'

// const token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFhSzlGQVZ2QkttUGVhMkFHdnN0IiwibmFtZSI6IlZpdG9yTG9wZXMiLCJlbWFpbCI6ImxvcGVzc3NickBnbWFpbC5jb20iLCJjcGYiOiI5OTkuOTk5Ljk5OS05OSIsImhhc0FkZHJlc3MiOnRydWUsImFkZHJlc3MiOiJSLiBMb3JvLCAxNTI2LCAyMjMgLSBuYWRhIiwiaWF0IjoxNTg2ODkxODcwfQ.SRXANWnaclJIAj8SONM_IFwXk1-4q-y30RSCY4RqKQY"

const setAddAddressAction = (userAddress) => {
    return {
        type: "ADD_ADDRESS",
        payload: {
            userAddress
        }
    }
}

export const createAddress = (userAddress) => async (dispatch) => {
    try {
        const result = await axios.put(`${baseURL}/address`, userAddress,
        {
            headers: { Auth: baseAuth }}
        )

        console.log(result.data.userAddress)
        dispatch(push(routes.feedPage))
    }
    catch(error){
        console.log(error)
        alert("Error ao tentar adicionar endereco!")
    }
}