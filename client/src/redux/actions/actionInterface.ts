import { workoutInterface, scheduleInterface } from '../../interfaces/interfaces'

export default interface Action {
  type: string,
  workout?: workoutInterface,
  error?: any
  schedules?: scheduleInterface
}
