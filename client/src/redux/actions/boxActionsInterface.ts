import { BoxInterface } from '../../interfaces/interfaces'
import actionTypes from './action-types'

type loadBoxesAction = {
  type: typeof actionTypes.LOAD_BOXES
  boxes: BoxInterface[]
}

type loadBoxesErrorAction = {
  type: typeof actionTypes.LOAD_BOXES_ERROR
  error: any
}

export type BoxActionTypes =
loadBoxesAction |
loadBoxesErrorAction
