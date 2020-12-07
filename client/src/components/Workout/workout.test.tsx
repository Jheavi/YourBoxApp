import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { loadWorkout } from '../../redux/actions/workoutActions'
import Workout from './Workout'
import { extractDataFromDate } from '../../utils/dateFunctions'
import { fireEvent, render } from '@testing-library/react-native'
import { dateObject } from '../../interfaces/interfaces'

jest.mock('../../redux/actions/workoutActions')

const buildStore = configureStore([thunk])

describe('Workout', () => {
  let todayDate: dateObject

  const wrapperFactory = (wrapperInitialState: any) => {
    const store = buildStore(wrapperInitialState)
    store.dispatch = jest.fn()

    return ({ children }:{children: ReactElement}): ReactElement => (
      <Provider store={store}>
        {children}
      </Provider>
    )
  }

  beforeEach(() => {
    todayDate = extractDataFromDate()
  })

  it('renders correctly', () => {
    const initialState = { workoutReducer: {} }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<Workout />, { wrapper })

    const dateTitle = getByTestId('workoutDate')

    expect(dateTitle.children[0]).toBe(todayDate.formattedDate)
  })

  it('should call loadWorkout', () => {
    const initialState = { workoutReducer: {} }
    const wrapper = wrapperFactory(initialState)

    render(<Workout />, { wrapper })

    expect(loadWorkout).toHaveBeenCalled()
  })

  it('should load the activityIndicator if workout is Loading', () => {
    const initialState = { workoutReducer: { workoutLoading: true } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<Workout />, { wrapper })

    const activityIndicator = getByTestId('workoutActivity')

    expect(activityIndicator).toBeDefined()
  })

  it('should change the date of workoutDate with the day selected', () => {
    const initialState = { workoutReducer: {} }
    const wrapper = wrapperFactory(initialState)
    const { queryByText, getByTestId } = render(<Workout />, { wrapper })
    const dateTitle = getByTestId('workoutDate')
    const day20button = queryByText('20')

    fireEvent(day20button!, 'press')

    expect(dateTitle.children[0]).toBe(`20/${todayDate.month}/${todayDate.year}`)
  })

  it('should change the modal to visible if touchableModal is touched', () => {
    const initialState = { workoutReducer: {} }
    const wrapper = wrapperFactory(initialState)
    const { getAllByTestId } = render(<Workout />, { wrapper })

    const [touchableModal, modal] = getAllByTestId(/Modal/)

    fireEvent(touchableModal, 'press')

    expect(modal.props.visible).toBe(true)
  })

  it('should put the workout date int the title when the workout is loaded', () => {
    const initialState = { workoutReducer: { workout: { date: '2020-11-20' } } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<Workout />, { wrapper })

    const dateTitle = getByTestId('workoutDate')

    expect(dateTitle.children[0]).toBe('20/11/2020')
  })
})
