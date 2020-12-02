import Action from '../actions/actionInterface'
import actionTypes from '../actions/action-types'
import { scheduleInterface } from '../../interfaces/interfaces'

interface schedulesReducerInterface {
  schedules?: [scheduleInterface]
}

const initialState = {}

export default function schedulesReducer (state: schedulesReducerInterface = initialState, action: Action) {
  let schedulesWithOrderedHours
  switch (action.type) {
    case actionTypes.LOAD_SCHEDULES:
    case actionTypes.UPDATE_SESSION:
    case actionTypes.CREATE_SESSION:
      schedulesWithOrderedHours = action.schedules!.map((schedule) => {
        return { ...schedule, hours: schedule.hours.sort((hour1, hour2) => hour1.startHour >= hour2.startHour ? 1 : -1) }
      })
      return { ...state, schedules: schedulesWithOrderedHours }
    default:
      return state
  }
}
