import axios from 'axios'
import jwtDecode from 'jwt-decode'
import serverUrls from '../../constants/serverUrls'
import { Auth0UserInterface, PastSession, ReservedSession, userInterface } from '../../interfaces/interfaces'
import { onLogout } from '../../utils/authFunctions'
import { AppDispatch } from '../configureStore'
import actionTypes from './action-types'
import { UserActionTypes } from './userActionsInterface'

function loginSuccess (user: Auth0UserInterface): UserActionTypes {
  return {
    type: actionTypes.USER_LOGIN,
    user
  }
}

function loginError (error: any): UserActionTypes {
  return {
    type: actionTypes.USER_LOGIN_ERROR,
    error
  }
}

export function login (idToken: string): any {
  return async (dispatch: AppDispatch) => {
    try {
      const { email, nickname, sub }: any = jwtDecode(idToken)

      const [connection, userId] = sub.split('|')

      const { data } = await axios.post(serverUrls.userUrl, {
        user: {
          email,
          name: nickname,
          connection,
          userId
        }
      })

      dispatch(loginSuccess(data))
    } catch (error) {
      dispatch(loginError(error))
    }
  }
}

function logoutSuccess (): UserActionTypes {
  return {
    type: actionTypes.USER_LOGOUT
  }
}

function logoutError (error: any): UserActionTypes {
  return {
    type: actionTypes.USER_LOGOUT_ERROR,
    error
  }
}

export function logout (): any {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await onLogout()

      if (response.type === 'success') {
        dispatch(logoutSuccess())
      } else {
        dispatch(logoutError(response.type))
      }
    } catch (error) {
      dispatch(logoutError(error))
    }
  }
}

function addOrRemoveSessionSuccess (updatedUser: userInterface): UserActionTypes {
  return {
    type: actionTypes.ADD_OR_REMOVE_SESSION,
    user: updatedUser
  }
}

function addOrRemoveSessionError (error: any): UserActionTypes {
  return {
    type: actionTypes.ADD_OR_REMOVE_SESSION_ERROR,
    error
  }
}

export function addOrRemoveReservedSession (
  reservedSession: ReservedSession,
  user: userInterface,
  option: 'addSession' | 'removeSession'
): any {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.patch(`${serverUrls.userUrl}/${user.userId}`, {
        reservedSession,
        option
      })

      dispatch(addOrRemoveSessionSuccess(data))
    } catch (error) {
      dispatch(addOrRemoveSessionError(error))
    }
  }
}

function updateResultSuccess (updatedUser: userInterface): UserActionTypes {
  return {
    type: actionTypes.UPDATE_RESULT,
    user: updatedUser
  }
}

function updateResultError (error: any): UserActionTypes {
  return {
    type: actionTypes.UPDATE_RESULT_ERROR,
    error
  }
}

export function updateResult (
  pastSession: PastSession,
  user: userInterface,
  option: 'updateResult',
  result: string
): any {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.patch(`${serverUrls.userUrl}/${user.userId}`, {
        pastSession,
        option,
        result
      })

      dispatch(updateResultSuccess(data))
    } catch (error) {
      dispatch(updateResultError(error))
    }
  }
}
