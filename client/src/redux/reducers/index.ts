import { combineReducers } from 'redux'
import workoutReducer from './workoutReducer'
import schedulesReducer from './schedulesReducer'
import userReducer from './userReducer'
import programReducer from './programReducer'
import boxReducer from './boxReducer'

const rootReducer = combineReducers({
  boxReducer,
  programReducer,
  schedulesReducer,
  userReducer,
  workoutReducer
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
