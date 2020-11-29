import { combineReducers } from 'redux'
import workoutReducer from './workoutReducer'

const rootReducer = combineReducers({ workoutReducer })

export default rootReducer
