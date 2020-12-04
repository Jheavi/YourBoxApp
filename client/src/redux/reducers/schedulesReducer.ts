import actionTypes from '../actions/action-types'
import { scheduleInterface } from '../../interfaces/interfaces'
import { AnyAction } from 'redux'
import { sortByWeekDays } from '../../utils/dateFunctions'

export interface schedulesState {
  schedules?: [scheduleInterface]
  schedulesLoading?: boolean
}

const initialState: schedulesState = {}

export default function schedulesReducer (state = initialState, action: AnyAction): schedulesState {
  let schedulesWithOrderedHours
  let updatedState
  switch (action.type) {
    case actionTypes.LOAD_SCHEDULES:
    case actionTypes.UPDATE_SESSION:
    case actionTypes.CREATE_SESSION:
      schedulesWithOrderedHours = action.schedules.map((schedule: scheduleInterface) => {
        return { ...schedule, sessions: schedule.sessions.sort((session1, session2) => session1.startHour >= session2.startHour ? 1 : -1) }
      }).sort(sortByWeekDays)
      updatedState = { ...state, schedules: schedulesWithOrderedHours, schedulesLoading: false }
      break
    case actionTypes.SCHEDULES_LOADING:
      updatedState = { ...state, schedulesLoading: true }
      break
    default:
      updatedState = state
      break
  }

  return updatedState
}
