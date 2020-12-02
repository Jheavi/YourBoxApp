import actionTypes from './action-types'
import axios from 'axios'
import serverUrls from '../../constants/serverUrls'
import Action from './actionInterface'
import { AppThunk } from '../reducers'
import { AppDispatch } from '../configureStore'
import { scheduleInterface, sessionInterface } from '../../interfaces/interfaces'

export function loadSchedulesSuccess (schedules: [scheduleInterface]): Action {
  return {
    type: actionTypes.LOAD_SCHEDULES,
    schedules
  }
}

export function loadSchedulesError (error: any): Action {
  return {
    type: actionTypes.LOAD_SCHEDULES_ERROR,
    error
  }
}

export function loadSchedules (): AppThunk {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.get(serverUrls.scheduleUrl)

      dispatch(loadSchedulesSuccess(data))
    } catch (error) {
      dispatch(loadSchedulesError(error))
    }
  }
}

export function updateSessionSuccess (schedules: [scheduleInterface]): Action {
  return {
    type: actionTypes.UPDATE_SESSION,
    schedules
  }
}

export function updateSessionError (error: any): Action {
  return {
    type: actionTypes.UPDATE_SESSION_ERROR,
    error
  }
}
export function updateSession (
  day: string,
  session: sessionInterface,
  finishHourValue: string,
  startHourValue: string,
  typeValue: string
): AppThunk {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.patch(`${serverUrls.scheduleUrl}/${day}`,
        {
          session,
          finishHourValue,
          startHourValue,
          typeValue
        }
      )

      dispatch(updateSessionSuccess(data))
    } catch (error) {
      dispatch(updateSessionError(error))
    }
  }
}
