import { AnyAction, combineReducers } from 'redux'
import { ThunkAction } from 'redux-thunk'
import workoutReducer from './workoutReducer'

const rootReducer = combineReducers({ workoutReducer })

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
