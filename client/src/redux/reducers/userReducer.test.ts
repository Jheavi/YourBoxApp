import userReducer from './userReducer'
import actionTypes from '../actions/action-types'
import { extractDataFromDate } from '../../utils/dateFunctions'

describe('userReducer', () => {
  const { month } = extractDataFromDate()
  const sessionOne = {
    day: '2020-06-20'
  }
  const sessionTwo = {
    day: `2020-${month}-01`
  }
  const sessionThree = {
    day: `2020-${month}-28`
  }
  const fakeUser = {
    active: false,
    admin: false,
    affiliatedProgram: 'newDate',
    connection: 'newDate',
    email: 'newDate',
    name: 'newDate',
    pastSessions: [sessionOne, sessionTwo],
    reservedSessions: [sessionOne, sessionThree],
    signInDate: 'newDate',
    userId: 'newDate'
  }

  it('should return the default state', () => {
    const state = userReducer(undefined, { type: 'null' })

    expect(state).toEqual({ isLogged: false })
  })

  it('should return the user in a property called user if action type is USER_LOGIN', () => {
    const fakeAction = {
      type: actionTypes.USER_LOGIN,
      user: fakeUser
    }

    const state = userReducer(undefined, fakeAction)
    const expectedState = {
      user: fakeUser,
      isLogged: true,
      pastSessionsThisMonth: [sessionTwo],
      reservedSessionsThisMonth: [sessionThree]
    }

    expect(state).toEqual(expectedState)
  })

  it('should return the user in a property called user if action type is ADD_SESSION', () => {
    const fakeAction = {
      type: actionTypes.ADD_SESSION,
      user: fakeUser
    }

    const state = userReducer(undefined, fakeAction)
    const expectedState = {
      user: fakeUser,
      isLogged: true,
      pastSessionsThisMonth: [sessionTwo],
      reservedSessionsThisMonth: [sessionThree]
    }

    expect(state).toEqual(expectedState)
  })

  it('should return the user in a property called user if action type is REMOVE_SESSION', () => {
    const fakeAction = {
      type: actionTypes.REMOVE_SESSION,
      user: fakeUser
    }

    const state = userReducer(undefined, fakeAction)
    const expectedState = {
      user: fakeUser,
      isLogged: true,
      pastSessionsThisMonth: [sessionTwo],
      reservedSessionsThisMonth: [sessionThree]
    }

    expect(state).toEqual(expectedState)
  })

  it('should return the user in a property called user if action type is UPDATE_RESULT', () => {
    const fakeAction = {
      type: actionTypes.UPDATE_RESULT,
      user: fakeUser
    }

    const state = userReducer(undefined, fakeAction)
    const expectedState = {
      user: fakeUser,
      isLogged: true,
      pastSessionsThisMonth: [sessionTwo],
      reservedSessionsThisMonth: [sessionThree]
    }

    expect(state).toEqual(expectedState)
  })

  it('should return the user null if action type is USER_LOGOUT', () => {
    const fakeAction = {
      type: actionTypes.USER_LOGOUT
    }

    const state = userReducer(undefined, fakeAction)

    expect(state).toEqual({ user: null, isLogged: false })
  })
})
