import actionTypes from '../actions/action-types'
import { AnyAction } from 'redux'
import { PastSession, ReservedSession, userInterface } from '../../interfaces/interfaces'
import { extractDataFromDate, sortBySession } from '../../utils/dateFunctions'

export interface userState {
  isLogged: boolean
  pastSessionsThisMonth?: PastSession[]
  reservedSessionsThisMonth?: ReservedSession[]
  user?: userInterface | null
  users?: userInterface[]
}

const initialState: userState = { isLogged: false }

export default function userReducer (state = initialState, action: AnyAction): userState {
  let pastSessionsThisMonth: PastSession[]
  let reservedSessionsThisMonth: ReservedSession[]
  let updatedState: userState
  let userWithOrderedPastSessions: userInterface
  let updatedUsers: userInterface[]

  switch (action.type) {
    case actionTypes.USER_LOGIN:
    case actionTypes.ADD_SESSION:
    case actionTypes.REMOVE_SESSION:
    case actionTypes.UPDATE_RESULT:
      userWithOrderedPastSessions = {
        ...action.user,
        pastSessions: action.user.pastSessions.sort(sortBySession)
      }
      pastSessionsThisMonth = action.user.pastSessions.filter((session: PastSession) => (
        extractDataFromDate(session.day).month === extractDataFromDate().month
      ))
      reservedSessionsThisMonth = action.user.reservedSessions.filter((session: ReservedSession) => (
        extractDataFromDate(session.day).month === extractDataFromDate().month
      ))
      updatedState = {
        ...state,
        isLogged: true,
        pastSessionsThisMonth,
        reservedSessionsThisMonth,
        user: userWithOrderedPastSessions
      }
      break
    case actionTypes.USER_LOGOUT:
      updatedState = { ...state, user: null, isLogged: false }
      break
    case actionTypes.LOAD_USERS:
      updatedState = { ...state, users: action.users }
      break
    case actionTypes.TOGGLE_USER_ACTIVE:
      updatedUsers = state.users!.filter((user) => user.userId !== action.user.userId)
      updatedUsers.push(action.user)
      updatedState = { ...state, users: updatedUsers }
      break
    default:
      updatedState = state
      break
  }

  return updatedState
}
