import { combineReducers } from 'redux'
import workoutReducer from './workoutReducer'
import schedulesReducer from './schedulesReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  workoutReducer,
  schedulesReducer,
  userReducer
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
