import { Auth0UserInterface, userInterface } from '../../interfaces/interfaces'
import actionTypes from './action-types'

type loginUserAction = {
  type: typeof actionTypes.USER_LOGIN
  user: Auth0UserInterface
}

type loginUserErrorAction = {
  type: typeof actionTypes.USER_LOGIN_ERROR
  error: any
}

type logoutUserAction = {
  type: typeof actionTypes.USER_LOGOUT
}

type logoutUserErrorAction = {
  type: typeof actionTypes.USER_LOGOUT_ERROR
  error: any
}

type addSessionAction = {
  type: typeof actionTypes.ADD_SESSION
  user: userInterface
}

type addSessionErrorAction = {
  type: typeof actionTypes.ADD_SESSION_ERROR
  error: any
}

type removeSessionAction = {
  type: typeof actionTypes.REMOVE_SESSION
  user: userInterface
}

type removeSessionErrorAction = {
  type: typeof actionTypes.REMOVE_SESSION_ERROR
  error: any
}

type updateResultAction = {
  type: typeof actionTypes.UPDATE_RESULT
  user: userInterface
}

type updateResultErrorAction = {
  type: typeof actionTypes.UPDATE_RESULT_ERROR
  error: any
}

type loadUsersAction = {
  type: typeof actionTypes.LOAD_USERS
  users: userInterface[]
}

type loadUsersErrorAction = {
  type: typeof actionTypes.LOAD_USERS_ERROR
  error: any
}

type toggleUserActiveAction = {
  type: typeof actionTypes.TOGGLE_USER_ACTIVE
  user: userInterface
}

type toggleUserActiveErrorAction = {
  type: typeof actionTypes.TOGGLE_USER_ACTIVE_ERROR
  error: any
}

type UpdateuserProgramAction = {
  type: typeof actionTypes.UPDATE_USER_PROGRAM
  user: userInterface
}

type UpdateuserProgramErrorAction = {
  type: typeof actionTypes.UPDATE_USER_PROGRAM_ERROR
  error: any
}

export type UserActionTypes =
loginUserAction |
loginUserErrorAction |
logoutUserAction |
logoutUserErrorAction |
addSessionAction |
addSessionErrorAction |
removeSessionAction |
removeSessionErrorAction |
loadUsersAction |
loadUsersErrorAction |
updateResultAction |
updateResultErrorAction |
toggleUserActiveAction |
toggleUserActiveErrorAction |
UpdateuserProgramAction |
UpdateuserProgramErrorAction
