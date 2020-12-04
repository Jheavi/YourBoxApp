import actionTypes from '../actions/action-types'
import { workoutInterface } from '../../interfaces/interfaces'
import { AnyAction } from 'redux'

export interface workoutState {
  workout?: workoutInterface
  workoutLoading?: boolean
}

const initialState: workoutState = {}

export default function workoutReducer (state = initialState, action: AnyAction): workoutState {
  switch (action.type) {
    case actionTypes.LOAD_WORKOUT:
      return { ...state, workout: action.workout, workoutLoading: false }
    case actionTypes.UPDATE_WORKOUT:
      return { ...state, workout: action.workout }
    case actionTypes.WORKOUT_LOADING:
      return { ...state, workoutLoading: true }
    default:
      return state
  }
}
