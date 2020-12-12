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

export function loadWorkout (date: string, boxId: string): any {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.get(`${serverUrls.workoutUrl}/${date}`, { params: { boxId } })

      dispatch(loadWorkoutSuccess(data))
    } catch (error) {
      dispatch(loadWorkoutError(error))
    }
  }
}

export function isWorkoutLoading (): WorkoutActionTypes {
  return {
    type: actionTypes.WORKOUT_LOADING
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
  boxId: string,
  updatedDescription?: string,
  updatedTitle?: string,
  updatedType?: string
): any {
  return async (dispatch:AppDispatch) => {
    try {
      const { data } = await axios.patch(
        `${serverUrls.workoutUrl}/${date}`,
        {
          boxId,
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

export function deleteWorkoutSuccess (): WorkoutActionTypes {
  return {
    type: actionTypes.DELETE_WORKOUT
  }
}

export function deleteWorkoutError (error: any): WorkoutActionTypes {
  return {
    type: actionTypes.DELETE_WORKOUT_ERROR,
    error
  }
}

export function deleteWorkout (date: string, boxId: string): any {
  return async (dispatch: AppDispatch) => {
    try {
      const config = { data: { boxId } }

      await axios.delete(`${serverUrls.workoutUrl}/${date}`, config)

      dispatch(deleteWorkoutSuccess())
    } catch (error) {
      dispatch(deleteWorkoutError(error))
    }
  }
}
