import actionTypes from '../actions/action-types'
import { ProgramInterface } from '../../interfaces/interfaces'
import { AnyAction } from 'redux'

export interface programState {
  programs?: ProgramInterface[]
  programsLoading?: boolean
}

const initialState: programState = {}

export default function programReducer (state = initialState, action: AnyAction): programState {
  let updateState: programState
  switch (action.type) {
    case actionTypes.LOAD_PROGRAMS:
      updateState = { ...state, programs: action.programs }
      break
    default:
      updateState = state
      break
  }

  return updateState
}
