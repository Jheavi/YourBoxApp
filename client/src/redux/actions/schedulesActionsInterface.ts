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

interface SchedulesLoadingAction {
  type: typeof actionTypes.SCHEDULES_LOADING
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

interface LoadScheduleAction {
  type: typeof actionTypes.LOAD_SCHEDULE
  schedule: scheduleInterface
}

interface LoadScheduleErrorAction {
  type: typeof actionTypes.LOAD_SCHEDULE_ERROR
  error: any
}

interface DeleteSessionAction {
  type: typeof actionTypes.CREATE_SESSION,
  schedules: scheduleInterface[]
}

interface DeleteSessionErrorAction {
  type: typeof actionTypes.CREATE_SESSION_ERROR,
  error: any
}
export type SchedulesActionTypes =
LoadSchedulesAction |
LoadSchedulesErrorAction |
SchedulesLoadingAction |
UpdateSessionAction |
UpdateSessionErrorAction |
CreateSessionAction |
CreateSessionErrorAction |
LoadScheduleAction |
LoadScheduleErrorAction |
DeleteSessionAction |
DeleteSessionErrorAction
