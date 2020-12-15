import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import thunk from 'redux-thunk'
import serverUrls from '../../constants/serverUrls'
import axios from 'axios'
import actionTypes from './action-types'
import { loadBoxes } from './boxActions'

jest.mock('axios')

const mockStore = configureMockStore([thunk])

describe('Schedules actions', () => {
  let fakeData: {data: {}}
  let fakeError: string
  let store: MockStoreEnhanced<unknown, {}> | null

  beforeEach(() => {
    store = mockStore()
    fakeData = { data: { id: 1 } }
    fakeError = 'error'
  })

  afterEach(() => {
    store = null
  })

  describe('loadBoxes', () => {
    test('should call axios.get with the url', async () => {
      await store!.dispatch(loadBoxes())

      expect(axios.get).toHaveBeenCalledWith(serverUrls.boxUrl)
    })

    test('the store should have an action with type LOAD_BOXES', async () => {
      axios.get = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(loadBoxes())

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.LOAD_BOXES,
        boxes: fakeData.data
      })
    })

    test('the store should have an action with type LOAD_BOXES_ERROR if promise rejected', async () => {
      axios.get = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(loadBoxes())

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.LOAD_BOXES_ERROR,
        error: fakeError
      })
    })
  })
})
