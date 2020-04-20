import React from 'react'
import axios from 'axios'
import { routes } from '../containers/Router/index';
import { push } from "connected-react-router";

const baseUrl = 'https://us-central1-missao-newton.cloudfunctions.net/rappi4'

export const showRestaurantsList = (restaurants) => {
  return {
    type: 'GET_RESTAURANTS',
    payload: {
      restaurants
    }
  }
}

export const sendID = (idRestaurant) => {
  console.log(idRestaurant)
  return {
    type: 'SET_ID',
    payload: {
      idRestaurant
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
    dispatch(showRestaurantsList(result.data.restaurants))
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
