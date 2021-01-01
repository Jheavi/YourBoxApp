import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { render } from '@testing-library/react-native'
import { loadSchedules } from '../../redux/actions/schedulesActions'
import Schedules from './Schedules'

jest.mock('../../redux/actions/schedulesActions')
jest.mock('./DaySchedule/DaySchedule')

const buildStore = configureStore([thunk])

describe('Schedules', () => {
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

  it('renders correctly if user is admin', () => {
    const initialState = {
      schedulesReducer: {},
      userReducer: { user: { admin: true, ownerOfBox: {} } }
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<Schedules />, { wrapper })

    const dateTitle = getByTestId('schedulesTitle')

    expect(dateTitle.children[0]).toBe('Your Schedules')
  })

  it('renders correctly if there is no user', () => {
    const initialState = {
      schedulesReducer: {},
      userReducer: { user: null }
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<Schedules />, { wrapper })

    const dateTitle = getByTestId('schedulesTitle')

    expect(dateTitle.children[0]).toBe('Schedules')
  })

  it('should render activityIndicator if schedules is loading', () => {
    const initialState = {
      schedulesReducer: { schedulesLoading: true },
      userReducer: { user: { admin: true, ownerOfBox: {} } }
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<Schedules />, { wrapper })

    const activityIndicator = getByTestId('activityIndicator')

    expect(activityIndicator).toBeDefined()
  })

  it('should call loadSchedules', () => {
    const initialState = {
      schedulesReducer: {},
      userReducer: { user: { admin: true, ownerOfBox: {} } }
    }
    const wrapper = wrapperFactory(initialState)
    render(<Schedules />, { wrapper })
    expect(loadSchedules).toHaveBeenCalled()
  })

  it('should call loadSchedules if schedules array is empty', () => {
    const initialState = {
      schedulesReducer: { schedules: [] },
      userReducer: { user: { admin: true, ownerOfBox: {} } }
    }
    const wrapper = wrapperFactory(initialState)
    render(<Schedules />, { wrapper })
    expect(loadSchedules).toHaveBeenCalled()
  })

  it('should render two DaySchedule components if schedules array is length 2', () => {
    const initialState = {
      schedulesReducer: { schedules: [{}, {}] },
      userReducer: { user: { admin: true, ownerOfBox: {} } }
    }
    const wrapper = wrapperFactory(initialState)

    const { getAllByText } = render(<Schedules />, { wrapper })
    const daySchedules = getAllByText(/MockedDaySchedule/)

    expect(daySchedules.length).toBe(2)
  })
})
