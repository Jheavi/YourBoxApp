import actionTypes from '../actions/action-types'
import { ProgramInterface } from '../../interfaces/interfaces'
import { AnyAction } from 'redux'

export interface programState {
  programs: ProgramInterface[]
  programsLoading?: boolean
}

const initialState: programState = { programs: [] }

export default function programReducer (state = initialState, action: AnyAction): programState {
  let updateState: programState
  let updatedPrograms: ProgramInterface[]
  switch (action.type) {
    case actionTypes.LOAD_PROGRAMS:
      updateState = { ...state, programs: action.programs }
      break
    case actionTypes.UPDATE_PROGRAM:
      updatedPrograms = state.programs!.filter((program) => (program._id !== action.program._id))
      updatedPrograms.push(action.program)
      updateState = { ...state, programs: updatedPrograms }
      break
    case actionTypes.CREATE_PROGRAM:
      updateState = { ...state, programs: [...state.programs, action.newProgram] }
      break
    default:
      updateState = state
      break
  }

  return updateState
}