import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import thunk from 'redux-thunk'
import serverUrls from '../../constants/serverUrls'
import axios from 'axios'
import * as actions from './workoutActions'
import actionTypes from './action-types'

jest.mock('axios')

const mockStore = configureMockStore([thunk])

describe('Workout actions', () => {
  let fakeBoxId: string
  let fakeData: {data: {}}
  let newDate: string
  let fakeError: string
  let newDescription: string
  let store: MockStoreEnhanced<unknown, {}> | null
  beforeEach(() => {
    store = mockStore()
    fakeBoxId = '456'
    fakeData = { data: { id: 1 } }
    newDate = 'today'
    fakeError = 'error'
    newDescription = 'new'
  })

  afterEach(() => {
    store = null
  })

  describe('loadWorkout', () => {
    test('should call axios.get with the url, the newDate and the box id', async () => {
      axios.get = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(actions.loadWorkout(newDate, fakeBoxId))

      const args = [
        `${serverUrls.workoutUrl}/${newDate}`,
        { params: { boxId: fakeBoxId } }
      ]

      expect(axios.get).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type LOAD_WORKOUT', async () => {
      axios.get = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(actions.loadWorkout(newDate, fakeBoxId))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.LOAD_WORKOUT,
        workout: fakeData.data
      })
    })

    test('the store should have an action with type LOAD_WORKOUT_ERROR if promise rejected', async () => {
      axios.get = jest.fn().mockRejectedValueOnce(fakeError)

      await store!.dispatch(actions.loadWorkout(newDate, fakeBoxId))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.LOAD_WORKOUT_ERROR,
        error: fakeError
      })
    })
  })

  describe('updateWorkout', () => {
    test('should call axios.get with the url, the newDate and the box id', async () => {
      axios.patch = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(actions.updateWorkout(newDate, fakeBoxId, newDescription))

      const args = [
        `${serverUrls.workoutUrl}/${newDate}`,
        {
          boxId: fakeBoxId,
          updatedDescription: newDescription
        }
      ]

      expect(axios.patch).toHaveBeenCalledWith(...args)
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

  describe('deleteWorkout', () => {
    test('should call axios.delete with the url and the box id', async () => {
      axios.delete = jest.fn().mockResolvedValueOnce(fakeData)

      await store!.dispatch(actions.deleteWorkout(newDate, fakeBoxId))

      const args = [
        `${serverUrls.workoutUrl}/${newDate}`,
        { data: { boxId: fakeBoxId } }
      ]

      expect(axios.delete).toHaveBeenCalledWith(...args)
    })

    test('the store should have an action with type DELETE_WORKOUT', async () => {
      axios.delete = jest.fn().mockResolvedValueOnce(fakeData)
      await store!.dispatch(actions.deleteWorkout(newDate, fakeBoxId))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.DELETE_WORKOUT
      })
    })

    test('the store should have an action with type DELETE_WORKOUT_ERROR if promise rejected', async () => {
      axios.delete = jest.fn().mockRejectedValueOnce(fakeError)
      await store!.dispatch(actions.deleteWorkout(newDate, fakeBoxId))

      expect(store!.getActions()[0]).toEqual({
        type: actionTypes.DELETE_WORKOUT_ERROR,
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
