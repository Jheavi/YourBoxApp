import { workoutInterface } from '../../interfaces/interfaces'
import actionTypes from './action-types'

type LoadWorkoutAction = {
  type: typeof actionTypes.LOAD_WORKOUT
  workout: workoutInterface
}

type LoadWorkoutErrorAction = {
  type: typeof actionTypes.LOAD_WORKOUT_ERROR
  error: any
}

type UpdateWorkoutAction = {
  type: typeof actionTypes.UPDATE_WORKOUT
  workout: workoutInterface
}

type UpdateWorkoutErrorAction = {
  type: typeof actionTypes.UPDATE_WORKOUT_ERROR
  error: any
}

type isWorkoutLoadingAction = {
  type: typeof actionTypes.WORKOUT_LOADING
}

type DeleteWorkoutAction = {
  type: typeof actionTypes.DELETE_WORKOUT
}

type DeleteWorkoutErrorAction = {
  type: typeof actionTypes.DELETE_WORKOUT_ERROR
  error: any
}

export type WorkoutActionTypes = LoadWorkoutAction |
LoadWorkoutErrorAction |
UpdateWorkoutAction |
UpdateWorkoutErrorAction |
isWorkoutLoadingAction |
DeleteWorkoutAction |
DeleteWorkoutErrorAction
