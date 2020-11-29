import actionTypes from './action-types'
import axios from 'axios'
import serverUrls from '../constants/serverUrls'

export function loadWorkoutSuccess (workout: object) {
  return {
    type: actionTypes.LOAD_WORKOUT,
    workout
  }
}

export function loadWorkoutError (error: any) {
  return {
    type: actionTypes.LOAD_WORKOUT_ERROR,
    error
  }
}

export function loadWorkout (date: string) {
  return async (dispatch: Function) => {
    try {
      const { data } = await axios.get(`${serverUrls.workoutUrl}/${date}`)

      dispatch(loadWorkoutSuccess(data))
    } catch (error) {
      dispatch(loadWorkoutError(error))
    }
  }
}
