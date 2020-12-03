import Action from '../actions/actionInterface'
import actionTypes from '../actions/action-types'
import { scheduleInterface } from '../../interfaces/interfaces'

interface schedulesReducerInterface {
  schedules?: [scheduleInterface]
}

const initialState = {}

export default function schedulesReducer (state: schedulesReducerInterface = initialState, action: Action) {
  let schedulesWithOrderedHours
  let updatedState
  switch (action.type) {
    case actionTypes.LOAD_SCHEDULES:
    case actionTypes.UPDATE_SESSION:
    case actionTypes.CREATE_SESSION:
      schedulesWithOrderedHours = action.schedules!.map((schedule) => {
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
