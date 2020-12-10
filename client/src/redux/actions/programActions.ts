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
