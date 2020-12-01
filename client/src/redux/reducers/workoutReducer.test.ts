import workoutReducer from './workoutReducer'
import actionTypes from '../actions/action-types'

describe('workoutReducer', () => {
  it('should return the default state', () => {
    const state = workoutReducer(undefined, { type: 'null' })

    expect(state).toEqual({})
  })

  it('should return the workout in a property called workout if action type is LOAD_WORKOUT', () => {
    const fakeWorkout = { date: 'today' }
    const fakeAction = {
      type: actionTypes.LOAD_WORKOUT,
      workout: fakeWorkout
    }

    const state = workoutReducer(undefined, fakeAction)

    expect(state).toEqual({ workout: fakeWorkout })
  })

  it('should return the workout in a property called workout if action type is UPDATE_WORKOUT', () => {
    const fakeWorkout = { date: 'today' }
    const fakeAction = {
      type: actionTypes.UPDATE_WORKOUT,
      workout: fakeWorkout
    }

    const state = workoutReducer(undefined, fakeAction)

    expect(state).toEqual({ workout: fakeWorkout })
  })
})