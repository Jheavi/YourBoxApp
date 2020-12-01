interface actionTypesInterface {
  LOAD_WORKOUT: string
  LOAD_WORKOUT_ERROR: string
  UPDATE_WORKOUT: string
  UPDATE_WORKOUT_ERROR: string,
  LOAD_SCHEDULES: string
}

const actionTypes: actionTypesInterface = {
  LOAD_WORKOUT: 'LOAD_WORKOUT',
  LOAD_WORKOUT_ERROR: 'LOAD_WORKOUT_ERROR',
  UPDATE_WORKOUT: 'UPDATE_WORKOUT',
  UPDATE_WORKOUT_ERROR: 'UPDATE_WORKOUT_ERROR',
  LOAD_SCHEDULES: 'LOAD_SCHEDULES'
}

export default actionTypes
