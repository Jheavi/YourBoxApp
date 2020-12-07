/* eslint-disable no-unused-vars */
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import thunk from 'redux-thunk'
import serverUrls from '../../constants/serverUrls'
import axios from 'axios'
import * as authFunctions from '../../utils/authFunctions'
import jwtDecode from 'jwt-decode'
import actionTypes from './action-types'
import { addOrRemoveReservedSession, login, logout } from './userActions'
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
  beforeEach(() => {
    store = mockStore()
    fakeData = { data: { id: 1 } }
    fakeError = 'error'
    idToken = 'abc'
    fakeUser = {
      active: false,
      admin: false,
      affiliatedProgram: 'a',
      connection: 'a',
      email: 'fakeEmail',
      name: 'a',
      pastSessions: [],
      reservedSessions: [],
      signInDate: 'a',
      userId: 'a'
    }
    fakeSession = {
      finishHour: '1',
      startHour: '1',
      type: 'a',
      day: '1'
    }
  })

  afterEach(() => {
    store = null
  })

  describe('login', () => {
    test('should call axios.get with the url', async () => {
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

  describe('addOrRemoveReservedSession', () => {
    test('should call axios.get with the url', async () => {
      axios.patch = jest.fn()

      await store!.dispatch(addOrRemoveReservedSession(fakeSession, fakeUser, 'add'))

      expect(axios.patch).toHaveBeenCalledWith(`${serverUrls.userUrl}/fakeEmail`, {
        reservedSession: fakeSession,
        option: 'add'
      })
    })

    test('the store should have an action with type ADD_OR_REMOVE_SESSION', async () => {
      axios.patch = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(addOrRemoveReservedSession(fakeSession, fakeUser, 'add'))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.ADD_OR_REMOVE_SESSION,
        user: fakeData.data
      })
    })

    test('the store should have an action with type ADD_OR_REMOVE_SESSION_ERROR', async () => {
      axios.patch = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(addOrRemoveReservedSession(fakeSession, fakeUser, 'add'))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.ADD_OR_REMOVE_SESSION_ERROR,
        error: fakeError
      })
    })
  })
})
