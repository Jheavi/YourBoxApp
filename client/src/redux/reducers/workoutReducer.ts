import Action from '../actions/actionInterface'
import actionTypes from '../actions/action-types'

const initialState = {}

export default function workoutReducer (state: object = initialState, action: Action) {
  switch (action.type) {
    case actionTypes.LOAD_WORKOUT:
      return { ...state, workout: action.workout }
    default:
      return state
  }
}
