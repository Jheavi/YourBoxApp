import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import thunk from 'redux-thunk'
import serverUrls from '../../constants/serverUrls'
import axios from 'axios'
import { loadSchedules, updateSession, createSession } from './schedulesActions'
import actionTypes from './action-types'
import { sessionInterface } from '../../interfaces/interfaces'

jest.mock('axios')

const mockStore = configureMockStore([thunk])

describe('Schedules actions', () => {
  let fakeData: {data: {}}
  let newDate: string
  let fakeError: string
  let store: MockStoreEnhanced<unknown, {}> | null
  let fakeSession: sessionInterface

  beforeEach(() => {
    store = mockStore()
    fakeData = { data: { id: 1 } }
    newDate = 'today'
    fakeError = 'error'
    fakeSession = {
      finishHour: '1',
      startHour: '1',
      type: '1'
    }
  })

  afterEach(() => {
    store = null
  })

  describe('loadSchedules', () => {
    test('should call axios.get with the url', async () => {
      axios.get = jest.fn()
      if (store) {
        await store.dispatch(loadSchedules())
      }

      expect(axios.get).toHaveBeenCalledWith(serverUrls.scheduleUrl)
    })

    test('the store should have an action with type LOAD_SCHEDULES', async () => {
      axios.get = jest.fn().mockResolvedValueOnce(fakeData)
      if (store) {
        await store.dispatch(loadSchedules())
        expect(store.getActions()[0]).toEqual({
          type: actionTypes.LOAD_SCHEDULES,
          schedules: fakeData.data
        })
      }
    })

    test('the store should have an action with type LOAD_SCHEDULES_ERROR if promise rejected', async () => {
      axios.get = jest.fn().mockRejectedValueOnce(fakeError)
      if (store) {
        await store.dispatch(loadSchedules())
        expect(store.getActions()[0]).toEqual({
          type: actionTypes.LOAD_SCHEDULES_ERROR,
          error: fakeError
        })
      }
    })
  })

  describe('updateSession', () => {
    test('should call axios.patch with the url', async () => {
      axios.patch = jest.fn()
      if (store) {
        await store.dispatch(updateSession(newDate, fakeSession, '2', '2', '2'))
      }

      const args = [
        `${serverUrls.scheduleUrl}/${newDate}`,
        { session: fakeSession, finishHourValue: '2', startHourValue: '2', typeValue: '2' }
      ]

      expect(axios.patch).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type UPDATE_SESSION', async () => {
      axios.patch = jest.fn().mockResolvedValueOnce(fakeData)
      if (store) {
        await store.dispatch(updateSession())
        expect(store.getActions()[0]).toEqual({
          type: actionTypes.UPDATE_SESSION,
          schedules: fakeData.data
        })
      }
    })

    test('the store should have an action with type UPDATE_SESSION_ERROR if promise rejected', async () => {
      axios.patch = jest.fn().mockRejectedValueOnce(fakeError)
      if (store) {
        await store.dispatch(updateSession())
        expect(store.getActions()[0]).toEqual({
          type: actionTypes.UPDATE_SESSION_ERROR,
          error: fakeError
        })
      }
    })
  })

  describe('createSession', () => {
    test('should call axios.post with the url', async () => {
      axios.post = jest.fn()
      if (store) {
        await store.dispatch(createSession(newDate, '2', '2', '2'))
      }

      const args = [
        `${serverUrls.scheduleUrl}/${newDate}`,
        { finishHourValue: '2', startHourValue: '2', typeValue: '2' }
      ]

      expect(axios.post).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type CREATE_SESSION', async () => {
      axios.post = jest.fn().mockResolvedValueOnce(fakeData)
      if (store) {
        await store.dispatch(createSession())
        expect(store.getActions()[0]).toEqual({
          type: actionTypes.CREATE_SESSION,
          schedules: fakeData.data
        })
      }
    })

    test('the store should have an action with type CREATE_SESSION_ERROR if promise rejected', async () => {
      axios.post = jest.fn().mockRejectedValueOnce(fakeError)
      if (store) {
        await store.dispatch(createSession())
        expect(store.getActions()[0]).toEqual({
          type: actionTypes.CREATE_SESSION_ERROR,
          error: fakeError
        })
      }
    })
  })
})
