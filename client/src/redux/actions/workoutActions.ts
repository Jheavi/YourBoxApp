import actionTypes from './action-types'
import axios from 'axios'
import serverUrls from '../../constants/serverUrls'
import Action from './actionInterface'
import { AppThunk } from '../reducers'
import { AppDispatch } from '../configureStore'
import { workoutInterface } from '../../interfaces/interfaces'

export function loadWorkoutSuccess (workout: workoutInterface): Action {
  return {
    type: actionTypes.LOAD_WORKOUT,
    workout
  }
}

export function loadWorkoutError (error: any): Action {
  return {
    type: actionTypes.LOAD_WORKOUT_ERROR,
    error
  }
}

export function loadWorkout (date: string): AppThunk {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.get(`${serverUrls.workoutUrl}/${date}`)

      dispatch(loadWorkoutSuccess(data))
    } catch (error) {
      dispatch(loadWorkoutError(error))
    }
  }
}

export function updateWorkoutSuccess (workout: workoutInterface): Action {
  return {
    type: actionTypes.UPDATE_WORKOUT,
    workout
  }
}

export function updateWorkoutError (error: any): Action {
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
) {
  return async (dispatch: AppDispatch) => {
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
