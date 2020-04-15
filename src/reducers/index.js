import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import restaurants from './restaurants';
import users from './users';
import cart from './cart'

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    restaurants,
    users,
    cart
  });
