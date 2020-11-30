import 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { loadWorkout } from '../../redux/actions/workoutActions'
import Workout from './Workout'
import { extractDataFromTodayDate } from '../../utils/dateFunctions'
import { render } from '@testing-library/react-native'
// Note: test renderer must be required after react-native.
import { dateObject } from '../../interfaces/interfaces'
import { ReactTestInstance } from 'react-test-renderer'

jest.mock('../../redux/actions/workoutActions')

const initialState = { workoutReducer: { } }

const buildStore = configureStore([thunk])

describe('Workout', () => {
  let todayDate: dateObject
  let element: ReactTestInstance
  beforeEach(() => {
    const store = buildStore(initialState)
    store.dispatch = jest.fn()
    todayDate = extractDataFromTodayDate()
    const Wrapper = ({ children }) => (
      <Provider store={store}>
        {children}
      </Provider>
    )
    const { getByTestId } = render(<Workout />, { wrapper: Wrapper })
    element = getByTestId('workoutDate')
  })

  afterEach(() => {
  })

  it('renders correctly', () => {
    expect(element.children[0]).toBe(
      `${todayDate.day}/${todayDate.month}/${todayDate.year}`
    )
  })

  it('should call loadWorkout', () => {
    expect(loadWorkout).toHaveBeenCalled()
  })
})
