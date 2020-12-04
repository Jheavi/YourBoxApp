export interface actionTypesInterface {
  LOAD_WORKOUT: string
  LOAD_WORKOUT_ERROR: string
  WORKOUT_LOADING: string
  UPDATE_WORKOUT: string
  UPDATE_WORKOUT_ERROR: string
  LOAD_SCHEDULES: string
  LOAD_SCHEDULES_ERROR: string
  SCHEDULES_LOADING: string
  UPDATE_SESSION: string
  UPDATE_SESSION_ERROR: string
  CREATE_SESSION: string
  CREATE_SESSION_ERROR: string
}

const actionTypes: actionTypesInterface = {
  LOAD_WORKOUT: 'LOAD_WORKOUT',
  LOAD_WORKOUT_ERROR: 'LOAD_WORKOUT_ERROR',
  WORKOUT_LOADING: 'WORKOUT_LOADING',
  UPDATE_WORKOUT: 'UPDATE_WORKOUT',
  UPDATE_WORKOUT_ERROR: 'UPDATE_WORKOUT_ERROR',
  LOAD_SCHEDULES: 'LOAD_SCHEDULES',
  LOAD_SCHEDULES_ERROR: 'LOAD_SCHEDULES_ERROR',
  SCHEDULES_LOADING: 'SCHEDULES_LOADING',
  UPDATE_SESSION: 'UPDATE_SESSION',
  UPDATE_SESSION_ERROR: 'UPDATE_SESSION_ERROR',
  CREATE_SESSION: 'CREATE_SESSION',
  CREATE_SESSION_ERROR: 'CREATE_SESSION_ERROR'
}

export default actionTypes
