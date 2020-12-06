import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import thunk from 'redux-thunk'
import serverUrls from '../../constants/serverUrls'
import axios from 'axios'
import * as actions from './workoutActions'
import actionTypes from './action-types'

jest.mock('axios')

const mockStore = configureMockStore([thunk])

describe('Workout actions', () => {
  let fakeData: {data: {}}
  let newDate: string
  let fakeError: string
  let newDescription: string
  let store: MockStoreEnhanced<unknown, {}> | null
  beforeEach(() => {
    store = mockStore()
    fakeData = { data: { id: 1 } }
    newDate = 'today'
    fakeError = 'error'
    newDescription = 'new'
  })

  afterEach(() => {
    store = null
  })

  describe('loadWorkout', () => {
    test('should call axios.get with the url and the newDate', async () => {
      axios.get = jest.fn().mockResolvedValueOnce(fakeData)
      await store!.dispatch(actions.loadWorkout(newDate))

      expect(axios.get).toHaveBeenCalledWith(`${serverUrls.workoutUrl}/${newDate}`)
    })

    test('the store should have an action with type LOAD_WORKOUT', async () => {
      axios.get = jest.fn().mockResolvedValueOnce(fakeData)
      await store!.dispatch(actions.loadWorkout(newDate))
      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.LOAD_WORKOUT,
        workout: fakeData.data
      })
    })

    test('the store should have an action with type LOAD_WORKOUT_ERROR if promise rejected', async () => {
      axios.get = jest.fn().mockRejectedValueOnce(fakeError)
      await store!.dispatch(actions.loadWorkout(newDate))
      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.LOAD_WORKOUT_ERROR,
        error: fakeError
      })
    })
  })

  describe('updateWorkout', () => {
    test('should call axios.get with the url and the newDate', async () => {
      axios.patch = jest.fn().mockResolvedValueOnce(fakeData)
      if (store) {
        await store.dispatch(actions.updateWorkout(newDate, newDescription))
      }

      expect(axios.patch).toHaveBeenCalledWith(`${serverUrls.workoutUrl}/${newDate}`, { updatedDescription: newDescription })
    })

    test('the store should have an action with type UPDATE_WORKOUT', async () => {
      axios.patch = jest.fn().mockResolvedValueOnce(fakeData)
      await store!.dispatch(actions.updateWorkout(newDate, newDescription))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.UPDATE_WORKOUT,
        workout: fakeData.data
      })
    })

    test('the store should have an action with type UPDATE_WORKOUT_ERROR if promise rejected', async () => {
      axios.patch = jest.fn().mockRejectedValueOnce(fakeError)
      await store!.dispatch(actions.updateWorkout(newDate, newDescription))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.UPDATE_WORKOUT_ERROR,
        error: fakeError
      })
    })
  })

  test('the store should have an action with type WORKOUT_LOADING', () => {
    store!.dispatch(actions.isWorkoutLoading())

    expect(store!.getActions()[0]).toEqual({
      type: actionTypes.WORKOUT_LOADING
    })
  })
})
