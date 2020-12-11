import { ProgramInterface } from '../../interfaces/interfaces'
import actionTypes from './action-types'

type loadProgramsAction = {
  type: typeof actionTypes.LOAD_PROGRAMS
  programs: ProgramInterface[]
}

type loadProgramsErrorAction = {
  type: typeof actionTypes.LOAD_PROGRAMS_ERROR
  error: any
}

type updateProgramAction = {
  type: typeof actionTypes.UPDATE_PROGRAM
  program: ProgramInterface
}

type updateProgramErrorAction = {
  type: typeof actionTypes.UPDATE_PROGRAM_ERROR
  error: any
}

type deleteProgramAction = {
  type: typeof actionTypes.DELETE_PROGRAM
  program: ProgramInterface
}

type deleteProgramErrorAction = {
  type: typeof actionTypes.DELETE_PROGRAM_ERROR
  error: any
}

type createProgramAction = {
  type: typeof actionTypes.CREATE_PROGRAM
  newProgram: ProgramInterface
}

type createProgramErrorAction = {
  type: typeof actionTypes.CREATE_PROGRAM_ERROR
  error: any
}

export type ProgramActionTypes =
loadProgramsAction |
loadProgramsErrorAction |
updateProgramAction |
updateProgramErrorAction |
deleteProgramAction |
deleteProgramErrorAction |
createProgramAction |
createProgramErrorAction
