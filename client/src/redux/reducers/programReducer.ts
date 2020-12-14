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
  let orderedPrograms: ProgramInterface[]
  let updatedPrograms: ProgramInterface[]
  switch (action.type) {
    case actionTypes.LOAD_PROGRAMS:
      orderedPrograms = action.programs.sort((program1: ProgramInterface, program2: ProgramInterface) => (
        program1.sessionsPerMonth > program2.sessionsPerMonth ? 1 : -1
      ))
      updateState = { ...state, programs: orderedPrograms }
      break
    case actionTypes.UPDATE_PROGRAM:
      updatedPrograms = state.programs.filter((program) => (program._id !== action.program._id))
      orderedPrograms = [...updatedPrograms, action.program].sort((program1: ProgramInterface, program2: ProgramInterface) => (
        program1.sessionsPerMonth > program2.sessionsPerMonth ? 1 : -1
      ))
      updateState = { ...state, programs: orderedPrograms }
      break
    case actionTypes.CREATE_PROGRAM:
      updatedPrograms = [...state.programs, action.newProgram]
      updatedPrograms.sort((program1: ProgramInterface, program2: ProgramInterface) => (
        program1.sessionsPerMonth > program2.sessionsPerMonth ? 1 : -1
      ))
      updateState = { ...state, programs: updatedPrograms }
      break
    default:
      updateState = state
      break
  }

  return updateState
}
