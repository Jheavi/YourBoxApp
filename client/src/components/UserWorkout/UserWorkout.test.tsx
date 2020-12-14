import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { loadWorkout } from '../../redux/actions/workoutActions'
import { extractDataFromDate } from '../../utils/dateFunctions'
import { fireEvent, render } from '@testing-library/react-native'
import { dateObject, userInterface } from '../../interfaces/interfaces'
import UserWorkout from './UserWorkout'

jest.mock('../../redux/actions/workoutActions')

const buildStore = configureStore([thunk])

describe('UserWorkout', () => {
  let fakeUser: userInterface
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
    fakeUser = {
      active: false,
      admin: false,
      affiliatedBox: {
        _id: '1',
        name: 'a',
        affiliates: [],
        owner: 'b',
        direction: 'a'
      },
      affiliatedProgram: {
        _id: '12345',
        name: 'fakeProgramName',
        sessionsPerMonth: 8,
        box: '456'
      },
      avatar: 'a',
      connection: 'a',
      email: 'a',
      name: 'a',
      pastSessions: [],
      reservedSessions: [],
      signInDate: 'a',
      userId: 'a'
    }
  })

  it('renders correctly', () => {
    const initialState = { workoutReducer: {}, userReducer: { user: fakeUser } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserWorkout />, { wrapper })

    const dateTitle = getByTestId('workoutDate')

    expect(dateTitle.children[0]).toBe(todayDate.formattedDate)
  })

  it('should call loadWorkout', () => {
    const initialState = { workoutReducer: {}, userReducer: { user: fakeUser } }
    const wrapper = wrapperFactory(initialState)

    render(<UserWorkout />, { wrapper })

    expect(loadWorkout).toHaveBeenCalled()
  })

  it('should load the activityIndicator if workout is Loading', () => {
    const initialState = { workoutReducer: { workoutLoading: true }, userReducer: { user: fakeUser } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserWorkout />, { wrapper })

    const activityIndicator = getByTestId('workoutActivity')

    expect(activityIndicator).toBeDefined()
  })

  it('should change the date of workoutDate with the day selected', () => {
    const initialState = { workoutReducer: {}, userReducer: { user: fakeUser } }
    const wrapper = wrapperFactory(initialState)
    const { queryByText, getByTestId } = render(<UserWorkout />, { wrapper })

    const dateTitle = getByTestId('workoutDate')
    const day13button = queryByText('13')

    fireEvent(day13button!, 'press')

    expect(dateTitle.children[0]).toBe(`13/${todayDate.month}/${todayDate.year}`)
  })

  it('should put the workout date int the title when the workout is loaded', () => {
    const initialState = { workoutReducer: { workout: { date: '2020-08-13' } }, userReducer: { user: fakeUser } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserWorkout />, { wrapper })

    const dateTitle = getByTestId('workoutDate')

    expect(dateTitle.children[0]).toBe('13/08/2020')
  })
})
