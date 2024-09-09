// reducer.js
import {
  FETCH_DISPENSERS_REQUEST,
  FETCH_DISPENSERS_SUCCESS,
  FETCH_DISPENSERS_FAILURE,
} from './actionTypes'

const initialState = {
  dispensers: [],
  loading: false,
  error: null,
}

const dispenserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DISPENSERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_DISPENSERS_SUCCESS:
      return {
        ...state,
        loading: false,
        dispensers: action.payload,
      }
    case FETCH_DISPENSERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default dispenserReducer
