import actionTypes from './action-types'
import axios from 'axios'
import serverUrls from '../../constants/serverUrls'
import { SchedulesActionTypes } from './schedulesActionsInterface'
import { scheduleInterface, SessionInterface } from '../../interfaces/interfaces'
import { AppDispatch } from '../configureStore'
import { extractDataFromDate } from '../../utils/dateFunctions'

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

export function loadSchedules (boxId: string): any {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.get(serverUrls.scheduleUrl, { params: { boxId } })

      dispatch(loadSchedulesSuccess(data))
    } catch (error) {
      dispatch(loadSchedulesError(error))
    }
  }
}

export function isSchedulesLoading (): SchedulesActionTypes {
  return {
    type: actionTypes.SCHEDULES_LOADING
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
  boxId: string,
  day: string,
  session: SessionInterface,
  finishHourValue: string,
  startHourValue: string,
  typeValue: string
): any {
  return async (dispatch: AppDispatch) => {
    try {
      const body = {
        boxId,
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
  boxId: string,
  day: string,
  finishHourValue: string,
  startHourValue: string,
  typeValue: string
): any {
  return async (dispatch: AppDispatch) => {
    try {
      const body = {
        boxId,
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

export function loadScheduleSuccess (schedule: scheduleInterface): SchedulesActionTypes {
  return {
    type: actionTypes.LOAD_SCHEDULE,
    schedule
  }
}

export function loadScheduleError (error: any): SchedulesActionTypes {
  return {
    type: actionTypes.LOAD_SCHEDULE_ERROR,
    error
  }
}
export function loadSchedule (date: string, boxId: string): any {
  return async (dispatch: AppDispatch) => {
    try {
      const { weekDay } = extractDataFromDate(date)

      const { data } = await axios.get(`${serverUrls.scheduleUrl}/${weekDay}`, { params: { boxId } })

      dispatch(loadScheduleSuccess(data))
    } catch (error) {
      dispatch(loadScheduleError(error))
    }
  }
}

export function deleteSessionSuccess (schedules: [scheduleInterface]): SchedulesActionTypes {
  return {
    type: actionTypes.DELETE_SESSION,
    schedules
  }
}

export function deleteSessionError (error: any): SchedulesActionTypes {
  return {
    type: actionTypes.DELETE_SESSION_ERROR,
    error
  }
}
export function deleteSession (boxId: string, weekDay: string, session: SessionInterface): any {
  return async (dispatch: AppDispatch) => {
    try {
      const config = { data: { session, boxId } }

      const { data } = await axios.delete(`${serverUrls.scheduleUrl}/${weekDay}`, config)

      dispatch(deleteSessionSuccess(data))
    } catch (error) {
      dispatch(deleteSessionError(error))
    }
  }
}
