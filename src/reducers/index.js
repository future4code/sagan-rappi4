import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import restaurant from "./restaurant";

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    restaurant
  });
