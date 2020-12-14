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

function addSessionSuccess (updatedUser: userInterface): UserActionTypes {
  return {
    type: actionTypes.ADD_SESSION,
    user: updatedUser
  }
}

function addSessionError (error: any): UserActionTypes {
  return {
    type: actionTypes.ADD_SESSION_ERROR,
    error
  }
}

export function addReservedSession (
  reservedSession: ReservedSession,
  { userId }: userInterface
): any {
  return async (dispatch: AppDispatch) => {
    try {
      const body = { reservedSession }
      const { data } = await axios.patch(`${serverUrls.addSessionUrl}/${userId}`, body)

      dispatch(addSessionSuccess(data))
    } catch (error) {
      dispatch(addSessionError(error))
    }
  }
}

function removeSessionSuccess (updatedUser: userInterface): UserActionTypes {
  return {
    type: actionTypes.REMOVE_SESSION,
    user: updatedUser
  }
}

function removeSessionError (error: any): UserActionTypes {
  return {
    type: actionTypes.REMOVE_SESSION_ERROR,
    error
  }
}

export function removeReservedSession (
  reservedSession: ReservedSession,
  { userId }: userInterface
): any {
  return async (dispatch: AppDispatch) => {
    try {
      const body = { reservedSession }
      const { data } = await axios.patch(`${serverUrls.removeSessionUrl}/${userId}`, body)

      dispatch(removeSessionSuccess(data))
    } catch (error) {
      dispatch(removeSessionError(error))
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
  { userId }: userInterface,
  result: string
): any {
  return async (dispatch: AppDispatch) => {
    try {
      const body = { pastSession, result }
      const { data } = await axios.patch(`${serverUrls.updateResultUrl}/${userId}`, body)

      dispatch(updateResultSuccess(data))
    } catch (error) {
      dispatch(updateResultError(error))
    }
  }
}

function loadUsersSuccess (users: userInterface[]): UserActionTypes {
  return {
    type: actionTypes.LOAD_USERS,
    users
  }
}

function loadUsersError (error: any): UserActionTypes {
  return {
    type: actionTypes.LOAD_USERS_ERROR,
    error
  }
}

export function loadUsers (boxId: string, active?: boolean): any {
  return async (dispatch: AppDispatch) => {
    try {
      const body = { params: { affiliatedBox: boxId, active } }
      const { data } = await axios.get(serverUrls.userUrl, body)

      dispatch(loadUsersSuccess(data))
    } catch (error) {
      dispatch(loadUsersError(error))
    }
  }
}

function toggleUserActiveSuccess (user: userInterface): UserActionTypes {
  return {
    type: actionTypes.TOGGLE_USER_ACTIVE,
    user
  }
}

function toggleUserActiveError (error: any): UserActionTypes {
  return {
    type: actionTypes.TOGGLE_USER_ACTIVE_ERROR,
    error
  }
}

export function toggleUserActive (user: userInterface): any {
  return async (dispatch: AppDispatch) => {
    try {
      const body = { active: user.active }
      const { data } = await axios.patch(`${serverUrls.toggleActiveUrl}/${user.userId}`, body)

      dispatch(toggleUserActiveSuccess(data))
    } catch (error) {
      dispatch(toggleUserActiveError(error))
    }
  }
}

function updateUserProgramSuccess (user: userInterface): UserActionTypes {
  return {
    type: actionTypes.UPDATE_USER_PROGRAM,
    user
  }
}

function updateUserProgramError (error: any): UserActionTypes {
  return {
    type: actionTypes.UPDATE_USER_PROGRAM_ERROR,
    error
  }
}

export function updateUserProgram (programId: string, userId: string): any {
  return async (dispatch: AppDispatch) => {
    try {
      const body = { programId }
      const { data } = await axios.patch(`${serverUrls.updateUserProgramUrl}/${userId}`, body)

      dispatch(updateUserProgramSuccess(data))
    } catch (error) {
      dispatch(updateUserProgramError(error))
    }
  }
}
