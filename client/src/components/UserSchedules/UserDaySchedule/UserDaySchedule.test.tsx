import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { render } from '@testing-library/react-native'
import UserDaySchedule from './UserDaySchedule'

jest.mock('../UserSessionItem/UserSessionItem')

const buildStore = configureStore([thunk])

describe('Workout', () => {
  let fakeDay: string
  let weekDay
  const wrapperFactory = (wrapperInitialState: any) => {
    const store = buildStore(wrapperInitialState)
    store.dispatch = jest.fn()

    return ({ children }:{children: ReactElement}): ReactElement => (
      <Provider store={store}>
        {children}
      </Provider>
    )
  }

  const performance = global.performance

  beforeEach(() => {
    fakeDay = '12'
    global.performance = { ...global.performance, now: jest.fn().mockReturnValue(Math.random()) }
  })

  afterEach(() => {
    global.performance = performance
    jest.resetAllMocks()
  })

  it('renders correctly', () => {
    weekDay = { day: 'Another Day', sessions: [] }
    const initialState = {}
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserDaySchedule weekDay={weekDay} day={fakeDay}/>, { wrapper })

    const title = getByTestId('dayScheduleTitle')

    expect(title.children[0]).toBe('Another Day')
  })

  it('should render "no schedule" if there is no sessions', () => {
    weekDay = { day: 'Another Day', sessions: [] }
    const initialState = {}
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserDaySchedule weekDay={weekDay} day={fakeDay}/>, { wrapper })

    const noScheduleText = getByTestId('noScheduleText')

    expect(noScheduleText.children[0]).toBe('There is no schedule for this day')
  })

  it('should render three SessionItem components with a sessions array with length 3', () => {
    weekDay = {
      day: 'Another Day',
      sessions: [
        { finishHour: '1', startHour: '1', type: '1' },
        { finishHour: '2', startHour: '2', type: '2' },
        { finishHour: '3', startHour: '3', type: '3' }
      ]
    }
    const initialState = {}
    const wrapper = wrapperFactory(initialState)
    const { getAllByText } = render(<UserDaySchedule weekDay={weekDay} day={fakeDay}/>, { wrapper })

    const sessionsItems = getAllByText(/MockedSessionItem/)

    expect(sessionsItems.length).toBe(3)
  })
})
