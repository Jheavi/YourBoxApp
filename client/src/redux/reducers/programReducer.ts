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
  let updatedPrograms: ProgramInterface[]
  switch (action.type) {
    case actionTypes.LOAD_PROGRAMS:
      updateState = { ...state, programs: action.programs }
      break
    case actionTypes.UPDATE_PROGRAMS:
      console.log(action.program)

      updatedPrograms = state.programs!.filter((program) => (program.name !== action.program.name))
      // updatedPrograms.push(action.program)
      console.log(updatedPrograms)

      updateState = { ...state, programs: updatedPrograms }
      break
    default:
      updateState = state
      break
  }

  return updateState
}
