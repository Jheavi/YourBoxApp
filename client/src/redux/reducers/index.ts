import { AnyAction, combineReducers } from 'redux'
import { ThunkAction } from 'redux-thunk'
import workoutReducer from './workoutReducer'
import schedulesReducer from './schedulesReducer'

const rootReducer = combineReducers({ workoutReducer, schedulesReducer })

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
