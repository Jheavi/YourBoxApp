import axios from 'axios'
import serverUrls from '../../constants/serverUrls'
import { ProgramInterface } from '../../interfaces/interfaces'
import { AppDispatch } from '../configureStore'
import actionTypes from './action-types'
import { ProgramActionTypes } from './programActionsInterface'

function loadProgramsSuccess (programs: ProgramInterface[]): ProgramActionTypes {
  return {
    type: actionTypes.LOAD_PROGRAMS,
    programs
  }
}

function loadProgramsError (error: any): ProgramActionTypes {
  return {
    type: actionTypes.LOAD_PROGRAMS_ERROR,
    error
  }
}

export function loadPrograms (boxId: string): any {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.get(serverUrls.programURL, { params: { boxId } })

      dispatch(loadProgramsSuccess(data))
    } catch (error) {
      dispatch(loadProgramsError(error))
    }
  }
}

function updateProgramSuccess (program: ProgramInterface): ProgramActionTypes {
  return {
    type: actionTypes.UPDATE_PROGRAM,
    program
  }
}

function updateProgramError (error: any): ProgramActionTypes {
  return {
    type: actionTypes.UPDATE_PROGRAM_ERROR,
    error
  }
}

export function updateProgram (program: ProgramInterface): any {
  return async (dispatch: AppDispatch) => {
    try {
      const body = { program }

      const { data } = await axios.patch(`${serverUrls.programURL}/${program._id}`, body)

      dispatch(updateProgramSuccess(data))
    } catch (error) {
      dispatch(updateProgramError(error))
    }
  }
}

function createProgramSuccess (newProgram: ProgramInterface): ProgramActionTypes {
  return {
    type: actionTypes.CREATE_PROGRAM,
    newProgram
  }
}

function createProgramError (error: any): ProgramActionTypes {
  return {
    type: actionTypes.CREATE_PROGRAM_ERROR,
    error
  }
}

export function createProgram (name: string, sessions: number, boxId: string): any {
  return async (dispatch: AppDispatch) => {
    try {
      const body = { name, sessions, boxId }

      const { data } = await axios.post(serverUrls.programURL, body)

      dispatch(createProgramSuccess(data))
    } catch (error) {
      dispatch(createProgramError(error))
    }
  }
}
