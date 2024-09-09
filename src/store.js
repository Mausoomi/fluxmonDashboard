import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  asideShow: false,
  theme: 'default',
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store




// // store.js
// import { createStore, applyMiddleware, combineReducers } from 'redux'
// import thunk from 'redux-thunk'

// // Initial state and reducer for changeState
// const initialState = {
//   sidebarShow: true,
//   asideShow: false,
//   theme: 'default',
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// // Import the dispenser reducer
// import dispenserReducer from '../src/Store/Rooms/reducer'

// // Combine reducers
// const rootReducer = combineReducers({
//   changeState,
//   dispenser: dispenserReducer,
// })

// // Create the store with thunk middleware
// const store = createStore(rootReducer, applyMiddleware(thunk))

// export default store
