import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

export default function configureStore (initialState: {} | undefined) {
  return createStore(rootReducer, initialState, compose(applyMiddleware(thunk)))
}

const store = configureStore({})

export type AppDispatch = typeof store.dispatch
