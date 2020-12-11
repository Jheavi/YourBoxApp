import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import thunk from 'redux-thunk'
import serverUrls from '../../constants/serverUrls'
import axios from 'axios'
import { loadSchedules, updateSession, createSession, isSchedulesLoading, loadSchedule, deleteSession } from './schedulesActions'
import actionTypes from './action-types'
import { SessionInterface } from '../../interfaces/interfaces'

jest.mock('axios')

const mockStore = configureMockStore([thunk])

describe('Schedules actions', () => {
  let fakeData: {data: {}}
  let fakeBoxId: string
  let newDate: string
  let fakeError: string
  let store: MockStoreEnhanced<unknown, {}> | null
  let fakeSession: SessionInterface

  beforeEach(() => {
    store = mockStore()
    fakeData = { data: { id: 1 } }
    fakeBoxId = '456'
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
      await store!.dispatch(loadSchedules(fakeBoxId))

      const args = [
        serverUrls.scheduleUrl,
        { params: { boxId: fakeBoxId } }
      ]

      expect(axios.get).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type LOAD_SCHEDULES', async () => {
      axios.get = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(loadSchedules(fakeBoxId))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.LOAD_SCHEDULES,
        schedules: fakeData.data
      })
    })

    test('the store should have an action with type LOAD_SCHEDULES_ERROR if promise rejected', async () => {
      axios.get = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(loadSchedules(fakeBoxId))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.LOAD_SCHEDULES_ERROR,
        error: fakeError
      })
    })
  })

  describe('updateSession', () => {
    test('should call axios.patch with the url', async () => {
      await store!.dispatch(updateSession(fakeBoxId, newDate, fakeSession, '2', '2', '2'))

      const args = [
        `${serverUrls.scheduleUrl}/${newDate}`,
        {
          boxId: fakeBoxId,
          session: fakeSession,
          finishHourValue: '2',
          startHourValue: '2',
          typeValue: '2'
        }
      ]

      expect(axios.patch).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type UPDATE_SESSION', async () => {
      axios.patch = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(updateSession(fakeBoxId, newDate, fakeSession, '2', '2', '2'))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.UPDATE_SESSION,
        schedules: fakeData.data
      })
    })

    test('the store should have an action with type UPDATE_SESSION_ERROR if promise rejected', async () => {
      axios.patch = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(updateSession(fakeBoxId, newDate, fakeSession, '2', '2', '2'))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.UPDATE_SESSION_ERROR,
        error: fakeError
      })
    })
  })

  describe('createSession', () => {
    test('should call axios.post with the url', async () => {
      await store!.dispatch(createSession(fakeBoxId, newDate, '2', '2', '2'))

      const args = [
        `${serverUrls.scheduleUrl}/${newDate}`,
        { boxId: fakeBoxId, finishHourValue: '2', startHourValue: '2', typeValue: '2' }
      ]

      expect(axios.post).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type CREATE_SESSION', async () => {
      axios.post = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(createSession(fakeBoxId, newDate, '2', '2', '2'))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.CREATE_SESSION,
        schedules: fakeData.data
      })
    })

    test('the store should have an action with type CREATE_SESSION_ERROR if promise rejected', async () => {
      axios.post = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(createSession(fakeBoxId, newDate, '2', '2', '2'))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.CREATE_SESSION_ERROR,
        error: fakeError
      })
    })
  })

  test('the store should have an action with type SCHEDULES_LOADING', async () => {
    await store!.dispatch(isSchedulesLoading())

    expect(store!.getActions()[0]).toEqual({
      type: actionTypes.SCHEDULES_LOADING
    })
  })

  describe('loadSchedule', () => {
    test('should call axios.get with the url', async () => {
      await store!.dispatch(loadSchedule('2020-12-07', fakeBoxId))

      const args = [
        `${serverUrls.scheduleUrl}/monday`,
        { params: { boxId: fakeBoxId } }
      ]

      expect(axios.get).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type LOAD_SCHEDULE', async () => {
      axios.get = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(loadSchedule('2020-12-07', fakeBoxId))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.LOAD_SCHEDULE,
        schedule: fakeData.data
      })
    })

    test('the store should have an action with type LOAD_SCHEDULE_ERROR if promise rejected', async () => {
      axios.get = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(loadSchedule('2020-12-07', fakeBoxId))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.LOAD_SCHEDULE_ERROR,
        error: fakeError
      })
    })
  })

  describe('deleteSession', () => {
    test('should call axios.delete with the url', async () => {
      await store!.dispatch(deleteSession(fakeBoxId, newDate, fakeSession))

      const args = [
        `${serverUrls.scheduleUrl}/${newDate}`,
        { data: { boxId: fakeBoxId, session: fakeSession } }
      ]

      expect(axios.delete).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type DELETE_SESSION', async () => {
      axios.delete = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(deleteSession(fakeBoxId, newDate, fakeSession))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.DELETE_SESSION,
        schedules: fakeData.data
      })
    })

    test('the store should have an action with type DELETE_SESSION_ERROR if promise rejected', async () => {
      axios.delete = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(deleteSession(fakeBoxId, newDate, fakeSession))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.DELETE_SESSION_ERROR,
        error: fakeError
      })
    })
  })
})
