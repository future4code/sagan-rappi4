import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import restaurants from './restaurants'
import cart from './cart'
import userAddress from './userAddress'

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    restaurants,
    cart,
    userAddress
  });
