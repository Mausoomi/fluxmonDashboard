// actions.js
import axios from 'axios'
import {
  FETCH_DISPENSERS_REQUEST,
  FETCH_DISPENSERS_SUCCESS,
  FETCH_DISPENSERS_FAILURE,
} from './actionTypes'

// Action creators
export const fetchDispensersRequest = () => ({
  type: FETCH_DISPENSERS_REQUEST,
})

export const fetchDispensersSuccess = (dispensers) => ({
  type: FETCH_DISPENSERS_SUCCESS,
  payload: dispensers,
})

export const fetchDispensersFailure = (error) => ({
  type: FETCH_DISPENSERS_FAILURE,
  payload: error,
})

// Async action to fetch dispensers
export const fetchDispensers = () => async (dispatch) => {
  dispatch(fetchDispensersRequest())
  try {
    const response = await axios.get('https://demo.fluxmon.com.br/api/v1/room')
    dispatch(fetchDispensersSuccess(response.data))
  } catch (error) {
    dispatch(fetchDispensersFailure(error.message))
  }
}
