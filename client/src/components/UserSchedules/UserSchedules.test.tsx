import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import { loadSchedule } from '../../redux/actions/schedulesActions'
import UserSchedules from './UserSchedules'
import { extractDataFromDate } from '../../utils/dateFunctions'

jest.mock('../../redux/actions/schedulesActions')
jest.mock('./UserDaySchedule/UserDaySchedule')

const buildStore = configureStore([thunk])

describe('UserSchedules', () => {
  const wrapperFactory = (wrapperInitialState: any) => {
    const store = buildStore(wrapperInitialState)
    store.dispatch = jest.fn()

    return ({ children }:{children: ReactElement}): ReactElement => (
      <Provider store={store}>
        {children}
      </Provider>
    )
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders correctly', () => {
    const initialState = { schedulesReducer: {}, userReducer: { user: { affiliatedBox: {} } } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserSchedules />, { wrapper })

    const dateTitle = getByTestId('scheduleDate')

    expect(dateTitle.children[0]).toBe(extractDataFromDate().formattedDate)
  })

  it('should call loadSchedule', () => {
    const initialState = { schedulesReducer: {}, userReducer: { user: { affiliatedBox: {} } } }
    const wrapper = wrapperFactory(initialState)
    render(<UserSchedules />, { wrapper })
    expect(loadSchedule).toHaveBeenCalled()
  })

  it('should load the activityIndicator if schedule is Loading', () => {
    const initialState = { schedulesReducer: { schedulesLoading: true }, userReducer: { user: { affiliatedBox: {} } } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserSchedules />, { wrapper })

    const activityIndicator = getByTestId('scheduleActivity')

    expect(activityIndicator).toBeDefined()
  })

  it('should call loadSchedule if a day is pressed', () => {
    const initialState = { schedulesReducer: {}, userReducer: { user: { affiliatedBox: {} } } }
    const wrapper = wrapperFactory(initialState)
    const { queryByText } = render(<UserSchedules />, { wrapper })

    const day15button = queryByText('15')
    fireEvent(day15button!, 'press')

    expect(loadSchedule).toHaveBeenCalled()
  })

  it('should render loadSchedule if a day is pressed', () => {
    const initialState = { schedulesReducer: { schedule: {} }, userReducer: { user: { affiliatedBox: {} } } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserSchedules />, { wrapper })

    const mockedUserDaySchedule = getByTestId('testUserDaySchedule')

    expect(mockedUserDaySchedule).toBeDefined()
  })
})
