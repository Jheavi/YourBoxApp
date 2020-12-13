import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import { userInterface } from '../../interfaces/interfaces'
import { extractDataFromDate } from '../../utils/dateFunctions'
import UserHome from './UserHome'

jest.mock('@react-navigation/native')

const buildStore = configureStore([thunk])

describe('UserHome', () => {
  let navigation: {navigate: jest.Mock<any, any>}
  let fakeUser: userInterface

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
    navigation = {
      navigate: jest.fn()
    }
    fakeUser = {
      active: false,
      admin: false,
      avatar: 'aa',
      affiliatedProgram: {
        _id: '12345',
        box: '456',
        name: 'a',
        sessionsPerMonth: 8
      },
      connection: 'a',
      email: 'fakeEmail',
      name: 'a',
      pastSessions: [],
      reservedSessions: [],
      signInDate: 'a',
      userId: 'a'
    }
  })

  it('renders correctly', () => {
    const initialState = { userReducer: { user: fakeUser, pastSessionsThisMonth: [], reservedSessionsThisMonth: [] } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserHome />, { wrapper })

    const sessionsText = getByTestId('sessionsText')

    expect(sessionsText.children[0]).toBe('Sessions used this month: 0')
  })

  it('should call navigation.navigate with argument "UserWorkout" with "Workout of the day" button', () => {
    const initialState = { userReducer: { user: fakeUser, pastSessionsThisMonth: [], reservedSessionsThisMonth: [] } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserHome navigation={navigation}/>, { wrapper })

    const workoutButton = getByTestId('workoutBtn')
    fireEvent.press(workoutButton)

    expect(navigation.navigate).toHaveBeenCalledWith('UserWorkout')
  })

  it('should call navigation.navigate with argument "UserSchedules" with "Book" button', () => {
    const initialState = { userReducer: { user: fakeUser, pastSessionsThisMonth: [], reservedSessionsThisMonth: [] } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserHome navigation={navigation}/>, { wrapper })

    const bookButton = getByTestId('bookBtn')
    fireEvent.press(bookButton)

    expect(navigation.navigate).toHaveBeenCalledWith('UserSchedules')
  })

  it('should call navigation.navigate with argument "UserResults" with "Your Results" button', () => {
    const initialState = { userReducer: { user: fakeUser, pastSessionsThisMonth: [], reservedSessionsThisMonth: [] } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserHome navigation={navigation}/>, { wrapper })

    const resultsButton = getByTestId('resultsBtn')
    fireEvent.press(resultsButton)

    expect(navigation.navigate).toHaveBeenCalledWith('UserResults')
  })

  it('should call navigation.navigate with argument "UserProfile" with "Your Profile" button', () => {
    const initialState = { userReducer: { user: fakeUser, pastSessionsThisMonth: [], reservedSessionsThisMonth: [] } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserHome navigation={navigation}/>, { wrapper })

    const profileButton = getByTestId('profileBtn')
    fireEvent.press(profileButton)

    expect(navigation.navigate).toHaveBeenCalledWith('UserProfile')
  })

  it('should not render remaining sessions if affiliatedProgram is not correct', () => {
    const initialState = {
      userReducer: {
        user: { ...fakeUser, affiliatedProgram: 'error' },
        pastSessionsThisMonth: [],
        reservedSessionsThisMonth: []
      }
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserHome navigation={navigation}/>, { wrapper })

    const remainingText = getByTestId('remainingText')

    expect(remainingText.children[0]).toBe('Remaining sessions: 0')
  })

  it('should render remaining sessions if user has reserved and past sessions in this month', () => {
    const { month } = extractDataFromDate()
    const initialState = {
      userReducer: {
        user: fakeUser,
        pastSessionsThisMonth: [{ day: `2020-${month}-01` }],
        reservedSessionsThisMonth: [{ day: `2020-${month}-28` }]
      }
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserHome navigation={navigation}/>, { wrapper })

    const remainingText = getByTestId('remainingText')

    expect(remainingText.children[0]).toBe('Remaining sessions: 6')
  })
})
