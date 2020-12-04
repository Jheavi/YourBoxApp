import { workoutInterface } from '../../interfaces/interfaces'
import actionTypes from './action-types'

interface LoadWorkoutAction {
  type: typeof actionTypes.LOAD_WORKOUT
  workout: workoutInterface
}

interface LoadWorkoutErrorAction {
  type: typeof actionTypes.LOAD_WORKOUT_ERROR
  error: any
}

interface UpdateWorkoutAction {
  type: typeof actionTypes.UPDATE_WORKOUT
  workout: workoutInterface
}

interface UpdateWorkoutErrorAction {
  type: typeof actionTypes.UPDATE_WORKOUT_ERROR
  error: any
}

export type WorkoutActionTypes = LoadWorkoutAction | LoadWorkoutErrorAction | UpdateWorkoutAction | UpdateWorkoutErrorAction
