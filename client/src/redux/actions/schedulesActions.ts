import actionTypes from './action-types'
import axios from 'axios'
import serverUrls from '../../constants/serverUrls'
import { SchedulesActionTypes } from './schedulesActionsInterface'
import { scheduleInterface, sessionInterface } from '../../interfaces/interfaces'
import { AppDispatch } from '../configureStore'

export function loadSchedulesSuccess (schedules: [scheduleInterface]): SchedulesActionTypes {
  return {
    type: actionTypes.LOAD_SCHEDULES,
    schedules
  }
}

export function loadSchedulesError (error: any): SchedulesActionTypes {
  return {
    type: actionTypes.LOAD_SCHEDULES_ERROR,
    error
  }
}

export function loadSchedules (): any {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.get(serverUrls.scheduleUrl)

      dispatch(loadSchedulesSuccess(data))
    } catch (error) {
      dispatch(loadSchedulesError(error))
    }
  }
}

export function updateSessionSuccess (schedules: [scheduleInterface]): SchedulesActionTypes {
  return {
    type: actionTypes.UPDATE_SESSION,
    schedules
  }
}

export function updateSessionError (error: any): SchedulesActionTypes {
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
): any {
  return async (dispatch: AppDispatch) => {
    try {
      const body = {
        session,
        finishHourValue,
        startHourValue,
        typeValue
      }

      const { data } = await axios.patch(`${serverUrls.scheduleUrl}/${day}`, body)

      dispatch(updateSessionSuccess(data))
    } catch (error) {
      dispatch(updateSessionError(error))
    }
  }
}

export function createSessionSuccess (schedules: [scheduleInterface]): SchedulesActionTypes {
  return {
    type: actionTypes.CREATE_SESSION,
    schedules
  }
}

export function createSessionError (error: any): SchedulesActionTypes {
  return {
    type: actionTypes.CREATE_SESSION_ERROR,
    error
  }
}
export function createSession (
  day: string,
  finishHourValue: string,
  startHourValue: string,
  typeValue: string
): any {
  return async (dispatch: AppDispatch) => {
    try {
      const body = {
        finishHourValue,
        startHourValue,
        typeValue
      }

      const { data } = await axios.post(`${serverUrls.scheduleUrl}/${day}`, body)

      dispatch(createSessionSuccess(data))
    } catch (error) {
      dispatch(createSessionError(error))
    }
  }
}
