import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { render } from '@testing-library/react-native'
import UserDaySchedule from './UserDaySchedule'
import { scheduleInterface, userInterface } from '../../../interfaces/interfaces'
import { extractDataFromDate } from '../../../utils/dateFunctions'

jest.mock('../UserSessionItem/UserSessionItem')

const buildStore = configureStore([thunk])

describe('UserDaySchedule', () => {
  let fakeDay: string
  let fakeSchedule: scheduleInterface
  let fakeUser: userInterface
  const { year, month } = extractDataFromDate()
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
    fakeDay = '12'
    fakeUser = {
      active: false,
      admin: false,
      affiliatedProgram: {
        _id: 'a',
        box: 'a',
        name: 'a',
        sessionsPerMonth: 8
      },
      avatar: 'a',
      connection: 'a',
      email: 'fakeEmail',
      name: 'a',
      pastSessions: [{
        day: `${year}-${month}-01`,
        finishHour: '10:00',
        startHour: '09:00',
        type: 'WOD'
      }],
      reservedSessions: [{
        day: `${year}-${month}-28`,
        finishHour: '10:00',
        startHour: '09:00',
        type: 'WOD'
      }],
      signInDate: 'a',
      userId: 'a'
    }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders correctly', () => {
    fakeSchedule = { day: 'Another Day', sessions: [] }
    const initialState = { userReducer: { user: fakeUser } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserDaySchedule weekDay={fakeSchedule} day={fakeDay}/>, { wrapper })

    const title = getByTestId('dayScheduleTitle')

    expect(title.children[0]).toBe('Another Day')
  })

  it('should render "no schedule" if there is no sessions', () => {
    fakeSchedule = { day: 'Another Day', sessions: [] }
    const initialState = { userReducer: { user: { ...fakeUser, active: true } } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserDaySchedule weekDay={fakeSchedule} day={fakeDay}/>, { wrapper })

    const noScheduleText = getByTestId('noScheduleText')

    expect(noScheduleText.children[0]).toBe('There is no schedule for this day')
  })

  it('should render three SessionItem components with a sessions array with length 3', () => {
    fakeSchedule = {
      day: 'Another Day',
      sessions: [
        { finishHour: '1', startHour: '1', type: 'WOD' },
        { finishHour: '2', startHour: '2', type: 'WOD' },
        { finishHour: '3', startHour: '3', type: 'WOD' }
      ]
    }
    const initialState = { userReducer: { user: fakeUser } }
    const wrapper = wrapperFactory(initialState)
    const { getAllByText } = render(<UserDaySchedule weekDay={fakeSchedule} day={fakeDay}/>, { wrapper })

    const sessionsItems = getAllByText(/MockedSessionItem/)

    expect(sessionsItems.length).toBe(3)
  })
})
