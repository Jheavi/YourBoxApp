import axios from 'axios'
import { maybeCompleteAuthSession } from 'expo-web-browser'
import jwtDecode from 'jwt-decode'
import serverUrls from '../../constants/serverUrls'
import { Auth0UserInterface } from '../../interfaces/interfaces'
import { onLogin, onLogout } from '../../utils/authFunctions'
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

export function login (): any {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await onLogin()

      if (response.type === 'success') {
        const { email, nickname, sub }: any = jwtDecode(response.params.id_token)

        const [connection, userId] = sub.split('|')

        const { data } = await axios.post(serverUrls.userUrl, {
          user: {
            email,
            name: nickname,
            connection,
            userId
          }
        })
        maybeCompleteAuthSession()

        dispatch(loginSuccess(data))
      } else {
        dispatch(loginError(response.type))
      }
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
        maybeCompleteAuthSession()

        dispatch(logoutSuccess())
      } else {
        dispatch(logoutError(response.type))
      }
    } catch (error) {
      dispatch(logoutError(error))
    }
  }
}
