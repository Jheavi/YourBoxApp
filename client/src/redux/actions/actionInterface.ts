import { workoutInterface } from '../../interfaces/interfaces'

export default interface Action {
  type: string,
  workout?: workoutInterface
}
