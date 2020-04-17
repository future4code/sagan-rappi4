import React from 'react'
import axios from 'axios'
import { routes } from '../containers/Router/index';
import { push } from "connected-react-router";

const baseUrl = 'https://us-central1-missao-newton.cloudfunctions.net/rappi4'
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFhSzlGQVZ2QkttUGVhMkFHdnN0IiwibmFtZSI6IlZpdG9yTG9wZXMiLCJlbWFpbCI6ImxvcGVzc3NickBnbWFpbC5jb20iLCJjcGYiOiI5OTkuOTk5Ljk5OS05OSIsImhhc0FkZHJlc3MiOnRydWUsImFkZHJlc3MiOiJSLiBBZm9uc28gQnJheiwgMTc3LCA3MiAtIFZpbGEgTi4gQ29uY2Vpw6fDo28iLCJpYXQiOjE1ODY4MTA1NjZ9.pMdUEWJYQiqNxjIE2nczcECA5mnUaJ3OvEdZHuuPS4Q'

export const showRestaurantsList = (restaurants) => {
  return {
    type: 'GET_RESTAURANTS',
    payload: {
      restaurants
    }
  }
}
export const sendID = (restaurantInfo) => {
  return {
    type: 'SEND_ID',
    payload: {
      restaurantInfo
    }
  }
}



export const getRestaurantsList = () => async (dispatch) => {
  const token = window.localStorage.getItem('token')
  try {
    const result = await axios.get(`${baseUrl}/restaurants`,
      {
        headers: {
          'Content-Type': 'application/json',
          auth: token
        }
      }
    )
    console.log(result.data.restaurants)
    dispatch(showRestaurantsList(result.data.restaurants))
    // dispatch(push(routes.feedPage))

  } catch (error) {
    console.log(error)
  }
}
export const showRestaurantDetail = (restaurantId) => async (dispatch) => {
  const token = window.localStorage.getItem('token')

  try {
    const result = await axios.get(`${baseUrl}/restaurants/${restaurantId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          auth: token
        }
      }
    )
    console.log(restaurantId)
    console.log(result.data.restaurant.products)
    dispatch(sendID(restaurantId))
    dispatch(push(routes.restaurantPage))
    
  } catch (error) {
    console.log(restaurantId)
    console.log(error)
  }
}
