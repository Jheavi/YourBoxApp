import { scheduleInterface } from '../../interfaces/interfaces'
import actionTypes from './action-types'

interface LoadSchedulesAction {
  type: typeof actionTypes.LOAD_SCHEDULES
  schedules: scheduleInterface[]
}

interface LoadSchedulesErrorAction {
  type: typeof actionTypes.LOAD_SCHEDULES_ERROR
  error: any
}

interface UpdateSessionAction {
  type: typeof actionTypes.UPDATE_SESSION
  schedules: scheduleInterface[]
}

interface UpdateSessionErrorAction {
  type: typeof actionTypes.UPDATE_SESSION_ERROR
  error: any
}

interface CreateSessionAction {
  type: typeof actionTypes.CREATE_SESSION
  schedules: scheduleInterface[]
}

interface CreateSessionErrorAction {
  type: typeof actionTypes.CREATE_SESSION_ERROR
  error: any
}

export type SchedulesActionTypes = LoadSchedulesAction |
LoadSchedulesErrorAction |
UpdateSessionAction |
UpdateSessionErrorAction |
CreateSessionAction |
CreateSessionErrorAction