import actionTypes from '../actions/action-types'
import { scheduleInterface } from '../../interfaces/interfaces'
import { AnyAction } from 'redux'

export interface schedulesState {
  schedules?: [scheduleInterface]
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
      })
      updatedState = { ...state, schedules: schedulesWithOrderedHours }
      break
    default:
      updatedState = state
      break
  }

  return updatedState
}
