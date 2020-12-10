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

export type ProgramActionTypes =
loadProgramsAction |
loadProgramsErrorAction
