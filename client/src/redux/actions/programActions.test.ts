import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import thunk from 'redux-thunk'
import serverUrls from '../../constants/serverUrls'
import axios from 'axios'
import actionTypes from './action-types'
import { createProgram, loadPrograms, updateProgram } from './programActions'
import { ProgramInterface } from '../../interfaces/interfaces'

jest.mock('axios')

const mockStore = configureMockStore([thunk])

describe('Schedules actions', () => {
  let fakeData: {data: {}}
  let fakeBoxId: string
  let fakeError: string
  let fakeProgram: ProgramInterface
  let fakeName: string
  let fakeSessions: number
  let store: MockStoreEnhanced<unknown, {}> | null

  beforeEach(() => {
    store = mockStore()
    fakeData = { data: { id: 1 } }
    fakeBoxId = '456'
    fakeError = 'error'
    fakeProgram = {
      _id: '12345',
      name: 'a',
      sessionsPerMonth: 8,
      box: fakeBoxId
    }
    fakeName = 'name'
    fakeSessions = 10
  })

  afterEach(() => {
    store = null
  })

  describe('loadPrograms', () => {
    test('should call axios.get with the url', async () => {
      await store!.dispatch(loadPrograms(fakeBoxId))

      const args = [
        serverUrls.programURL,
        { params: { boxId: fakeBoxId } }
      ]

      expect(axios.get).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type LOAD_PROGRAMS', async () => {
      axios.get = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(loadPrograms(fakeBoxId))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.LOAD_PROGRAMS,
        programs: fakeData.data
      })
    })

    test('the store should have an action with type LOAD_PROGRAMS_ERROR if promise rejected', async () => {
      axios.get = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(loadPrograms(fakeBoxId))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.LOAD_PROGRAMS_ERROR,
        error: fakeError
      })
    })
  })

  describe('updateProgram', () => {
    test('should call axios.patch with the url', async () => {
      await store!.dispatch(updateProgram(fakeProgram))

      const args = [
        `${serverUrls.programURL}/${fakeProgram._id}`,
        { program: fakeProgram }
      ]

      expect(axios.patch).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type UPDATE_PROGRAM', async () => {
      axios.patch = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(updateProgram(fakeProgram))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.UPDATE_PROGRAM,
        program: fakeData.data
      })
    })

    test('the store should have an action with type UPDATE_PROGRAM_ERROR if promise rejected', async () => {
      axios.patch = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(updateProgram(fakeProgram))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.UPDATE_PROGRAM_ERROR,
        error: fakeError
      })
    })
  })

  describe('createProgram', () => {
    test('should call axios.post with the url', async () => {
      await store!.dispatch(createProgram(fakeName, fakeSessions, fakeBoxId))

      const args = [
        serverUrls.programURL,
        { name: fakeName, sessions: fakeSessions, boxId: fakeBoxId }
      ]

      expect(axios.post).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type CREATE_PROGRAM', async () => {
      axios.post = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(createProgram(fakeName, fakeSessions, fakeBoxId))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.CREATE_PROGRAM,
        newProgram: fakeData.data
      })
    })

    test('the store should have an action with type CREATE_PROGRAM_ERROR if promise rejected', async () => {
      axios.post = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(createProgram(fakeName, fakeSessions, fakeBoxId))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.CREATE_PROGRAM_ERROR,
        error: fakeError
      })
    })
  })
})
