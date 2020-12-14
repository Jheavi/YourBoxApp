/* eslint-disable no-unused-vars */
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import thunk from 'redux-thunk'
import serverUrls from '../../constants/serverUrls'
import axios from 'axios'
import * as authFunctions from '../../utils/authFunctions'
import jwtDecode from 'jwt-decode'
import actionTypes from './action-types'
import { addReservedSession, loadUsers, login, logout, removeReservedSession, toggleUserActive, updateResult, updateUserProgram } from './userActions'
import { ReservedSession, userInterface } from '../../interfaces/interfaces'

jest.mock('axios')
jest.mock('../../utils/authFunctions')
jest.mock('jwt-decode', () => () => ({
  email: 'a',
  nickname: 'a',
  sub: 'a|a'
}))
jest.mock('expo-web-browser')

const mockStore = configureMockStore([thunk])

describe('Schedules actions', () => {
  let fakeData: {data: {}}
  let fakeError: string
  let store: MockStoreEnhanced<unknown, {}> | null
  let spyOnLogout
  let idToken: string
  let fakeSession: ReservedSession
  let fakeUser: userInterface
  let fakeResult: string
  beforeEach(() => {
    store = mockStore()
    fakeData = { data: { id: 1 } }
    fakeError = 'error'
    idToken = 'abc'
    fakeUser = {
      active: false,
      admin: false,
      affiliatedProgram: {
        _id: 'a',
        box: 'a',
        name: 'a',
        sessionsPerMonth: 0
      },
      avatar: 'a',
      connection: 'a',
      email: 'fakeEmail',
      name: 'a',
      pastSessions: [],
      reservedSessions: [],
      signInDate: 'a',
      userId: 'fakeId'
    }
    fakeSession = {
      finishHour: '1',
      startHour: '1',
      type: 'WOD',
      day: '1'
    }
    fakeResult = '12345'
  })

  afterEach(() => {
    store = null
  })

  describe('login', () => {
    test('should call axios.post with the url', async () => {
      axios.post = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(login(idToken))

      expect(axios.post).toHaveBeenCalledWith(serverUrls.userUrl, {
        user: {
          email: 'a',
          name: 'a',
          connection: 'a',
          userId: 'a'
        }
      })
    })

    test('the store should have an action with type USER_LOGIN', async () => {
      axios.post = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(login(idToken))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.USER_LOGIN,
        user: fakeData.data
      })
    })

    test('the store should have an action with type USER_LOGIN_ERROR if promise rejected', async () => {
      axios.post = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(login(idToken))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.USER_LOGIN_ERROR,
        error: fakeError
      })
    })
  })

  describe('logout', () => {
    test('the store should have an action with type USER_LOGOUT', async () => {
      spyOnLogout = jest.spyOn(authFunctions, 'onLogout').mockResolvedValueOnce({
        type: 'success',
        params: { id_token: 'a' },
        authentication: null,
        errorCode: null,
        url: 'a'
      })

      await store!.dispatch(logout())

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.USER_LOGOUT
      })
    })

    test('the store should have an action with type USER_LOGOUT_ERROR if response.type is not "success"', async () => {
      spyOnLogout = jest.spyOn(authFunctions, 'onLogout').mockResolvedValueOnce({
        type: 'dismiss'
      })

      await store!.dispatch(logout())

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.USER_LOGOUT_ERROR,
        error: 'dismiss'
      })
    })

    test('the store should have an action with type USER_LOGOUT_ERROR if promise rejected', async () => {
      spyOnLogout = jest.spyOn(authFunctions, 'onLogout').mockRejectedValueOnce(fakeError)

      await store!.dispatch(logout())

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.USER_LOGOUT_ERROR,
        error: fakeError
      })
    })
  })

  describe('addReservedSession', () => {
    test('should call axios.patch with the url', async () => {
      axios.patch = jest.fn()

      await store!.dispatch(addReservedSession(fakeSession, fakeUser))

      const args = [
        `${serverUrls.addSessionUrl}/fakeId`,
        { reservedSession: fakeSession }
      ]

      expect(axios.patch).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type ADD_SESSION', async () => {
      axios.patch = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(addReservedSession(fakeSession, fakeUser))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.ADD_SESSION,
        user: fakeData.data
      })
    })

    test('the store should have an action with type ADD_SESSION_ERROR', async () => {
      axios.patch = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(addReservedSession(fakeSession, fakeUser))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.ADD_SESSION_ERROR,
        error: fakeError
      })
    })
  })

  describe('removeReservedSession', () => {
    test('should call axios.patch with the url', async () => {
      axios.patch = jest.fn()

      await store!.dispatch(removeReservedSession(fakeSession, fakeUser))

      const args = [
        `${serverUrls.removeSessionUrl}/fakeId`,
        { reservedSession: fakeSession }
      ]

      expect(axios.patch).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type REMOVE_SESSION', async () => {
      axios.patch = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(removeReservedSession(fakeSession, fakeUser))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.REMOVE_SESSION,
        user: fakeData.data
      })
    })

    test('the store should have an action with type REMOVE_SESSION_ERROR', async () => {
      axios.patch = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(removeReservedSession(fakeSession, fakeUser))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.REMOVE_SESSION_ERROR,
        error: fakeError
      })
    })
  })

  describe('updateResult', () => {
    test('should call axios.patch with the url', async () => {
      axios.patch = jest.fn()

      await store!.dispatch(updateResult(fakeSession, fakeUser, fakeResult))

      const args = [
        `${serverUrls.updateResultUrl}/fakeId`,
        { pastSession: fakeSession, result: fakeResult }
      ]

      expect(axios.patch).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type UPDATE_RESULT', async () => {
      axios.patch = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(updateResult(fakeSession, fakeUser, fakeResult))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.UPDATE_RESULT,
        user: fakeData.data
      })
    })

    test('the store should have an action with type UPDATE_RESULT_ERROR', async () => {
      axios.patch = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(updateResult(fakeSession, fakeUser, fakeResult))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.UPDATE_RESULT_ERROR,
        error: fakeError
      })
    })
  })

  describe('loadUsers', () => {
    test('should call axios.patch with the url', async () => {
      axios.get = jest.fn()

      await store!.dispatch(loadUsers('123'))

      const args = [
        serverUrls.userUrl,
        { params: { affiliatedBox: '123' } }
      ]

      expect(axios.get).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type LOAD_USERS', async () => {
      axios.get = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(loadUsers('123'))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.LOAD_USERS,
        users: fakeData.data
      })
    })

    test('the store should have an action with type LOAD_USERS_ERROR', async () => {
      axios.get = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(loadUsers('123'))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.LOAD_USERS_ERROR,
        error: fakeError
      })
    })
  })

  describe('toggleUserActive', () => {
    test('should call axios.patch with the url', async () => {
      axios.patch = jest.fn()

      await store!.dispatch(toggleUserActive(fakeUser))

      const args = [
        `${serverUrls.toggleActiveUrl}/fakeId`,
        { active: false }
      ]

      expect(axios.patch).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type TOGGLE_USER_ACTIVE', async () => {
      axios.patch = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(toggleUserActive(fakeUser))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.TOGGLE_USER_ACTIVE,
        user: fakeData.data
      })
    })

    test('the store should have an action with type TOGGLE_USER_ACTIVE_ERROR', async () => {
      axios.patch = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(toggleUserActive(fakeUser))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.TOGGLE_USER_ACTIVE_ERROR,
        error: fakeError
      })
    })
  })

  describe('updateUserProgram', () => {
    test('should call axios.patch with the url', async () => {
      axios.patch = jest.fn()

      await store!.dispatch(updateUserProgram('1234', fakeUser.userId))

      const args = [
        `${serverUrls.updateUserProgramUrl}/fakeId`,
        { programId: '1234' }
      ]

      expect(axios.patch).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type UPDATE_USER_PROGRAM', async () => {
      axios.patch = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(updateUserProgram('1234', fakeUser.userId))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.UPDATE_USER_PROGRAM,
        user: fakeData.data
      })
    })

    test('the store should have an action with type UPDATE_USER_PROGRAM_ERROR', async () => {
      axios.patch = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(updateUserProgram('1234', fakeUser.userId))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.UPDATE_USER_PROGRAM_ERROR,
        error: fakeError
      })
    })
  })
})
