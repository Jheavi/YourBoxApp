import actionTypes from '../actions/action-types'
import { AnyAction } from 'redux'
import { BoxInterface } from '../../interfaces/interfaces'

export interface boxState {
  boxes?: BoxInterface[]
}

const initialState: boxState = {}

export default function boxReducer (state = initialState, action: AnyAction): boxState {
  let updatedState: boxState

  switch (action.type) {
    case actionTypes.LOAD_BOXES:
      updatedState = { ...state, boxes: action.boxes }
      break
    default:
      updatedState = state
      break
  }

  return updatedState
}
