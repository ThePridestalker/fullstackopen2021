import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterSlice from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterSlice.reducer
})

const store = createStore(reducer, composeWithDevTools())

export default store
