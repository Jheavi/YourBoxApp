import actionTypes from '../actions/action-types'
import boxReducer from './boxReducer'

describe('boxReducer', () => {
  let fakeBoxes: []

  beforeEach(() => {
    fakeBoxes = []
  })

  it('should return the default state', () => {
    const state = boxReducer(undefined, { type: 'null' })

    expect(state).toEqual({})
  })

  it('should return the programs ordered in a property called programs if action type is LOAD_BOXES', () => {
    const fakeAction = {
      type: actionTypes.LOAD_BOXES,
      boxes: fakeBoxes
    }

    const state = boxReducer(undefined, fakeAction)

    expect(state).toEqual({ boxes: fakeBoxes })
  })
})
