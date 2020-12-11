import actionTypes from '../actions/action-types'
import { scheduleInterface, SessionInterface } from '../../interfaces/interfaces'
import { AnyAction } from 'redux'
import { sortByWeekDays } from '../../utils/dateFunctions'

export interface schedulesState {
  schedules?: scheduleInterface[]
  schedule?: scheduleInterface
  schedulesLoading?: boolean
}

const initialState: schedulesState = {}

export default function schedulesReducer (state = initialState, action: AnyAction): schedulesState {
  let scheduleWithOrderedHours: scheduleInterface
  let schedulesWithOrderedHours: scheduleInterface[]
  let updatedState: schedulesState
  switch (action.type) {
    case actionTypes.LOAD_SCHEDULES:
    case actionTypes.UPDATE_SESSION:
    case actionTypes.CREATE_SESSION:
    case actionTypes.DELETE_SESSION:
      schedulesWithOrderedHours = action.schedules.map((schedule: scheduleInterface) => {
        return { ...schedule, sessions: schedule.sessions.sort((session1, session2) => session1.startHour >= session2.startHour ? 1 : -1) }
      }).sort(sortByWeekDays)
      updatedState = { ...state, schedules: schedulesWithOrderedHours, schedulesLoading: false }
      break
    case actionTypes.SCHEDULES_LOADING:
      updatedState = { ...state, schedulesLoading: true }
      break
    case actionTypes.LOAD_SCHEDULE:
      scheduleWithOrderedHours = {
        ...action.schedule,
        sessions: action.schedule.sessions.sort(
          (session1: SessionInterface, session2: SessionInterface) => (
            session1.startHour >= session2.startHour ? 1 : -1
          ))
      }
      updatedState = { ...state, schedule: scheduleWithOrderedHours, schedulesLoading: false }
      break
    default:
      updatedState = state
      break
  }

  return updatedState
}
