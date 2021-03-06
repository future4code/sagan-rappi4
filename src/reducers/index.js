import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import restaurants from './restaurants';
import users from './users';
import cart from './cart'
import userAddress from './userAddress'
import menu from './menu'
import profile from './profile'
import feed from './feed'

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    restaurants,
    cart,
    userAddress,
    menu,
    users,
    profile,
    feed
  });
