import actionTypes from '../actions/action-types'
import { AnyAction } from 'redux'
import { BoxInterface } from '../../interfaces/interfaces'

export interface boxState {
  boxes?: BoxInterface[]
}

const initialState: boxState = {}

export default function boxReducer (state = initialState, action: AnyAction): boxState {
  let updatedState: boxState

  if (action.type === actionTypes.LOAD_BOXES) {
    updatedState = { ...state, boxes: action.boxes }
  } else {
    updatedState = state
  }

  return updatedState
}
