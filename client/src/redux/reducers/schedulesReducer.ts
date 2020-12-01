import Action from '../actions/actionInterface'
import actionTypes from '../actions/action-types'
import { scheduleInterface } from '../../interfaces/interfaces'

interface schedulesReducerInterface {
  schedules?: [scheduleInterface]
}

const initialState = {}

export default function workoutReducer (state: schedulesReducerInterface = initialState, action: Action) {
  switch (action.type) {
    case actionTypes.LOAD_SCHEDULES:
      return { ...state, schedules: action.schedules }
    default:
      return state
  }
}
