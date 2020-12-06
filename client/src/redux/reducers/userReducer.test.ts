import userReducer from './userReducer'
import actionTypes from '../actions/action-types'

describe('userReducer', () => {
  it('should return the default state', () => {
    const state = userReducer(undefined, { type: 'null' })

    expect(state).toEqual({ isLogged: false })
  })

  it('should return the user in a property called user if action type is USER_LOGIN', () => {
    const fakeUser = {
      active: false,
      admin: false,
      affiliatedProgram: 'newDate',
      connection: 'newDate',
      email: 'newDate',
      name: 'newDate',
      pastSessions: [],
      reservedSessions: [],
      signInDate: 'newDate',
      userId: 'newDate'
    }
    const fakeAction = {
      type: actionTypes.USER_LOGIN,
      user: fakeUser
    }

    const state = userReducer(undefined, fakeAction)

    expect(state).toEqual({ user: fakeUser, isLogged: true })
  })

  it('should return the user null if action type is USER_LOGOUT', () => {
    const fakeAction = {
      type: actionTypes.USER_LOGOUT
    }

    const state = userReducer(undefined, fakeAction)

    expect(state).toEqual({ user: null, isLogged: false })
  })
})
