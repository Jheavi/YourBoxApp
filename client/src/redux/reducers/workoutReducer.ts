import actionTypes from '../actions/action-types'
import { workoutInterface } from '../../interfaces/interfaces'
import { AnyAction } from 'redux'

export interface workoutState {
  workout?: workoutInterface | null
  workoutLoading?: boolean
}

const initialState: workoutState = {}

export default function workoutReducer (state = initialState, action: AnyAction): workoutState {
  let updatedState
  switch (action.type) {
    case actionTypes.LOAD_WORKOUT:
      updatedState = { ...state, workout: action.workout, workoutLoading: false }
      break
    case actionTypes.UPDATE_WORKOUT:
      updatedState = { ...state, workout: action.workout }
      break
    case actionTypes.WORKOUT_LOADING:
      updatedState = { ...state, workout: null, workoutLoading: true }
      break
    case actionTypes.DELETE_WORKOUT:
      updatedState = { ...state, workout: null }
      break
    default:
      updatedState = state
      break
  }

  return updatedState
}
