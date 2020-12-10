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

type addOrRemoveSessionAction = {
  type: typeof actionTypes.ADD_OR_REMOVE_SESSION
  user: Auth0UserInterface
}

type addOrRemoveSessionErrorAction = {
  type: typeof actionTypes.ADD_OR_REMOVE_SESSION_ERROR
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

export type UserActionTypes =
loginUserAction |
loginUserErrorAction |
logoutUserAction |
logoutUserErrorAction |
addOrRemoveSessionAction |
addOrRemoveSessionErrorAction |
loadUsersAction |
loadUsersErrorAction
