import actionTypes from '../actions/action-types'
import { workoutInterface } from '../../interfaces/interfaces'
import { AnyAction } from 'redux'

export interface workoutState {
  workout?: workoutInterface
}

const initialState: workoutState = {}

export default function workoutReducer (state = initialState, action: AnyAction) {
  switch (action.type) {
    case actionTypes.LOAD_WORKOUT:
      return { ...state, workout: action.workout }
    case actionTypes.UPDATE_WORKOUT:
      return { ...state, workout: action.workout }
    default:
      return state
  }
}
