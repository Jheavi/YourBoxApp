import { combineReducers } from 'redux'
import workoutReducer from './workoutReducer'
import schedulesReducer from './schedulesReducer'

const rootReducer = combineReducers({
  workoutReducer,
  schedulesReducer
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
