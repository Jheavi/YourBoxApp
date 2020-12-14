import axios from 'axios'
import serverUrls from '../../constants/serverUrls'
import { BoxInterface } from '../../interfaces/interfaces'
import { AppDispatch } from '../configureStore'
import actionTypes from './action-types'
import { BoxActionTypes } from './boxActionsInterface'

function loadBoxesSuccess (boxes: BoxInterface[]): BoxActionTypes {
  return {
    type: actionTypes.LOAD_BOXES,
    boxes
  }
}
function loadBoxesError (error: any): BoxActionTypes {
  return {
    type: actionTypes.LOAD_BOXES_ERROR,
    error
  }
}
export function loadBoxes (): any {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await axios.get(serverUrls.boxUrl)

      dispatch(loadBoxesSuccess(data))
    } catch (error) {
      dispatch(loadBoxesError(error))
    }
  }
}
