import userReducer from './userReducer'
import actionTypes from '../actions/action-types'
import { extractDataFromDate } from '../../utils/dateFunctions'

describe('userReducer', () => {
  const { month } = extractDataFromDate()
  let sessionOne: any
  let sessionTwo: any
  let sessionThree: any
  let fakeUser: any
  let fakeUserTwo: any
  let fakeUserTwoUpdated: any
  let fakeUsers: any
  let fakeUserThree: any
  let fakeUserFour: any

  beforeEach(() => {
    sessionOne = {
      day: '2020-06-20'
    }
    sessionTwo = {
      day: `2020-${month}-01`
    }
    sessionThree = {
      day: `2020-${month}-28`
    }
    fakeUser = {
      active: false,
      admin: false,
      affiliatedProgram: 'cc',
      connection: 'cc',
      email: 'cc',
      name: 'cc',
      pastSessions: [sessionOne, sessionTwo],
      reservedSessions: [sessionOne, sessionThree],
      signInDate: 'newDate',
      userId: 'cc'
    }
    fakeUserTwo = {
      active: true,
      admin: false,
      affiliatedProgram: 'aa',
      connection: 'aa',
      email: 'aa',
      name: 'aa',
      pastSessions: [],
      reservedSessions: [],
      signInDate: 'newDate',
      userId: 'aa'
    }
    fakeUserThree = {
      active: true,
      admin: false,
      affiliatedProgram: 'bb',
      connection: 'bb',
      email: 'bb',
      name: 'bb',
      pastSessions: [],
      reservedSessions: [],
      signInDate: 'newDate',
      userId: 'bb'
    }
    fakeUserFour = {
      active: true,
      admin: false,
      affiliatedProgram: 'dd',
      connection: 'dd',
      email: 'dd',
      name: 'dd',
      pastSessions: [],
      reservedSessions: [],
      signInDate: 'newDate',
      userId: 'dd'
    }
    fakeUserTwoUpdated = {
      active: false,
      admin: false,
      affiliatedProgram: 'aa',
      connection: 'aa',
      email: 'aa',
      name: 'aa',
      pastSessions: [],
      reservedSessions: [],
      signInDate: 'newDate',
      userId: 'aa'
    }
    fakeUsers = [fakeUser, fakeUserTwo, fakeUserThree, fakeUserFour]
  })

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

  it('should return the users (ordered by name) in a property called users if action type is LOAD_USERS', () => {
    const fakeAction = {
      type: actionTypes.LOAD_USERS,
      users: fakeUsers
    }

    const state = userReducer(undefined, fakeAction)

    expect(state).toEqual({ users: [fakeUserTwo, fakeUserThree, fakeUser, fakeUserFour], isLogged: false })
  })

  it('should update the user in the variable users (ordered by name) from state if action type is TOGGLE_USER_ACTIVE', () => {
    const fakeAction = {
      type: actionTypes.TOGGLE_USER_ACTIVE,
      user: fakeUserTwoUpdated
    }
    const state = userReducer({ users: fakeUsers, isLogged: false }, fakeAction)
    const expectedState = { users: [fakeUserTwoUpdated, fakeUserThree, fakeUser, fakeUserFour], isLogged: false }

    expect(state).toEqual(expectedState)
  })

  it('should update the user in the variable users (ordered by name) from state if action type is UPDATE_USER_PROGRAM', () => {
    const fakeAction = {
      type: actionTypes.UPDATE_USER_PROGRAM,
      user: fakeUserTwoUpdated
    }
    const state = userReducer({ users: fakeUsers, isLogged: false }, fakeAction)
    const expectedState = { users: [fakeUserTwoUpdated, fakeUserThree, fakeUser, fakeUserFour], isLogged: false }

    expect(state).toEqual(expectedState)
  })
})
