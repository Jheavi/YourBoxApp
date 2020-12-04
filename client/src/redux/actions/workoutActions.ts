import actionTypes from './action-types'
import axios from 'axios'
import serverUrls from '../../constants/serverUrls'
import { WorkoutActionTypes } from './workoutActionInterfaces'
import { workoutInterface } from '../../interfaces/interfaces'
import { AppDispatch } from '../configureStore'

export function loadWorkoutSuccess (workout: workoutInterface): WorkoutActionTypes {
  return {
    type: actionTypes.LOAD_WORKOUT,
    workout
  }
}

export function loadWorkoutError (error: any): WorkoutActionTypes {
  return {
    type: actionTypes.LOAD_WORKOUT_ERROR,
    error
  }
}

export function loadWorkout (date: string): any {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.get(`${serverUrls.workoutUrl}/${date}`)

      dispatch(loadWorkoutSuccess(data))
    } catch (error) {
      dispatch(loadWorkoutError(error))
    }
  }
}

export function updateWorkoutSuccess (workout: workoutInterface): WorkoutActionTypes {
  return {
    type: actionTypes.UPDATE_WORKOUT,
    workout
  }
}

export function updateWorkoutError (error: any): WorkoutActionTypes {
  return {
    type: actionTypes.UPDATE_WORKOUT_ERROR,
    error
  }
}

export function updateWorkout (
  date: string,
  updatedDescription?: string,
  updatedTitle?: string,
  updatedType?: string
): any {
  return async (dispatch:AppDispatch) => {
    try {
      const { data } = await axios.patch(
        `${serverUrls.workoutUrl}/${date}`,
        {
          updatedDescription,
          updatedTitle,
          updatedType
        }
      )

      dispatch(updateWorkoutSuccess(data))
    } catch (error) {
      dispatch(updateWorkoutError(error))
    }
  }
}
