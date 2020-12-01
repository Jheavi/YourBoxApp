import Action from '../actions/actionInterface'
import actionTypes from '../actions/action-types'
import { workoutInterface } from '../../interfaces/interfaces'

export interface WorkoutState {
  workout?: workoutInterface
}

const initialState = {}

export default function workoutReducer (state: WorkoutState = initialState, action: Action): WorkoutState {
  switch (action.type) {
    case actionTypes.LOAD_WORKOUT:
      return { ...state, workout: action.workout }
    case actionTypes.UPDATE_WORKOUT:
      return { ...state, workout: action.workout }
    default:
      return state
  }
}
