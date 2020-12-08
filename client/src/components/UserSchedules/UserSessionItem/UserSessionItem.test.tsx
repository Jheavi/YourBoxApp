import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import UserSessionItem from './UserSessionItem'
import { userInterface } from '../../../interfaces/interfaces'
import { addOrRemoveReservedSession } from '../../../redux/actions/userActions'
import { extractDataFromDate } from '../../../utils/dateFunctions'

jest.mock('../../../redux/actions/userActions')

const buildStore = configureStore([thunk])

describe('Workout', () => {
  let session
  let fakeUser: userInterface
  let day: string
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
    day = '2080-11-15'
    fakeUser = {
      active: false,
      admin: false,
      affiliatedProgram: 'a',
      connection: 'a',
      email: 'fakeEmail',
      name: 'a',
      pastSessions: [],
      reservedSessions: [],
      signInDate: 'a',
      userId: 'a'
    }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders correctly', () => {
    session = { finishHour: '10:00', startHour: '09:00', type: 'WOD' }
    const initialState = { userReducer: { user: fakeUser } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserSessionItem day={day} session={session}/>, { wrapper })

    const hourText = getByTestId('hourText')

    expect(hourText.children[0]).toBe('09:00 - 10:00')
  })

  it('should render type Olympics correctly', () => {
    session = { finishHour: '10:00', startHour: '09:00', type: 'Olympics' }
    const initialState = { userReducer: { user: fakeUser } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserSessionItem day={day} session={session}/>, { wrapper })

    const hourText = getByTestId('typeText')

    expect(hourText.children[0]).toBe('Olympics')
  })

  it('should render the cancel button if the user already has the session in reservedSessions', () => {
    session = { finishHour: '10:00', startHour: '09:00', type: 'Open Box' }
    const initialState = {
      userReducer: {
        user: {
          ...fakeUser,
          reservedSessions: [{
            day: '2080-11-15',
            finishHour: '10:00',
            startHour: '09:00',
            type: 'Open Box'
          }]
        }
      }
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserSessionItem day={day} session={session}/>, { wrapper })

    const cancelButton = getByTestId('cancelBtn')

    expect(cancelButton).toBeDefined()
  })

  it('should call addOrRemoveReservedSession action if enroll button is pressed', () => {
    session = { finishHour: '10:00', startHour: '09:00', type: 'Open Box' }
    const initialState = { userReducer: { user: fakeUser } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserSessionItem day={day} session={session}/>, { wrapper })

    const enrollButton = getByTestId('enrollBtn')
    fireEvent.press(enrollButton)

    expect(addOrRemoveReservedSession).toHaveBeenCalledWith(
      { ...session, day: '2080-11-15' },
      fakeUser,
      'add'
    )
  })

  it('should call addOrRemoveReservedSession action if cancel button is pressed', () => {
    session = { finishHour: '10:00', startHour: '09:00', type: 'Open Box' }
    const fakeUserReserved = {
      ...fakeUser,
      reservedSessions: [{
        day: '2080-11-15',
        finishHour: '10:00',
        startHour: '09:00',
        type: 'Open Box'
      }]
    }
    const initialState = { userReducer: { user: fakeUserReserved } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserSessionItem day={day} session={session}/>, { wrapper })

    const cancelButton = getByTestId('cancelBtn')
    fireEvent.press(cancelButton)

    expect(addOrRemoveReservedSession).toHaveBeenCalledWith(
      { ...session, day: '2080-11-15' },
      fakeUserReserved,
      'remove'
    )
  })

  it('enroll button should be disabled if session has passed', () => {
    session = { finishHour: '10:00', startHour: '09:00', type: 'Open Box' }
    day = '2020-11-20'
    const initialState = { userReducer: { user: fakeUser } }

    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserSessionItem day={day} session={session}/>, { wrapper })

    const enrollButton = getByTestId('enrollBtn')

    expect(enrollButton).toBeDisabled()
  })

  it('cancel button should be disabled if session is today but has passed', () => {
    session = { finishHour: '06:00', startHour: '05:00', type: 'Open Box' }
    day = extractDataFromDate().dayString
    const fakeUserReserved = {
      ...fakeUser,
      reservedSessions: [{
        day: extractDataFromDate().dayString,
        finishHour: '06:00',
        startHour: '05:00',
        type: 'Open Box'
      }]
    }
    const initialState = { userReducer: { user: fakeUserReserved } }

    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserSessionItem day={day} session={session}/>, { wrapper })

    const cancelButton = getByTestId('cancelBtn')

    expect(cancelButton).toBeDisabled()
  })
})
