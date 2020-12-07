import actionTypes from '../actions/action-types'
import { AnyAction } from 'redux'
import { userInterface } from '../../interfaces/interfaces'

export interface userState {
  user?: userInterface | null,
  isLogged: boolean
}

const initialState: userState = { isLogged: false }

export default function userReducer (state = initialState, action: AnyAction): userState {
  let updatedState: userState
  switch (action.type) {
    case actionTypes.USER_LOGIN:
    case actionTypes.ADD_OR_REMOVE_SESSION:
      updatedState = { ...state, user: action.user, isLogged: true }
      break
    case actionTypes.USER_LOGOUT:
      updatedState = { ...state, user: null, isLogged: false }
      break
    default:
      updatedState = state
      break
  }

  return updatedState
}
