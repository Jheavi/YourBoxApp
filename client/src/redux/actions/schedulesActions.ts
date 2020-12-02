import actionTypes from './action-types'
import axios from 'axios'
import serverUrls from '../../constants/serverUrls'
import Action from './actionInterface'
import { AppThunk } from '../reducers'
import { AppDispatch } from '../configureStore'
import { scheduleInterface } from '../../interfaces/interfaces'

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
