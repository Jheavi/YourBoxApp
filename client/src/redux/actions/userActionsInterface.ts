import { Auth0UserInterface } from '../../interfaces/interfaces'
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
export type UserActionTypes = loginUserAction |
loginUserErrorAction |
logoutUserAction |
logoutUserErrorAction
