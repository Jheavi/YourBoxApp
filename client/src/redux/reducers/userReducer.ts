import actionTypes from '../actions/action-types'
import { AnyAction } from 'redux'
import { userInterface } from '../../interfaces/interfaces'

export interface userState {
  user?: userInterface | null,
  isLogged: boolean
}

const initialState: userState = { isLogged: false }

export default function userReducer (state = initialState, action: AnyAction): userState {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return { ...state, user: action.user, isLogged: true }
    case actionTypes.USER_LOGOUT:
      return { ...state, user: null, isLogged: false }
    default:
      return state
  }
}
