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

describe('Workout', () => {
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
    global.performance = { ...global.performance, now: jest.fn().mockReturnValue(Math.random()) }
  })

  afterEach(() => {
    global.performance = performance
    jest.resetAllMocks()
  })

  it('renders correctly', () => {
    const initialState = { schedulesReducer: {} }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<Schedules />, { wrapper })

    const dateTitle = getByTestId('schedulesTitle')

    expect(dateTitle.children[0]).toBe('Your Schedules')
  })

  it('should call loadSchedules', () => {
    const initialState = { schedulesReducer: {} }
    const wrapper = wrapperFactory(initialState)
    render(<Schedules />, { wrapper })
    expect(loadSchedules).toHaveBeenCalled()
  })

  it('should call loadSchedules if schedules array is empty', () => {
    const initialState = { schedulesReducer: { schedules: [] } }
    const wrapper = wrapperFactory(initialState)
    render(<Schedules />, { wrapper })
    expect(loadSchedules).toHaveBeenCalled()
  })

  it('should not call loadSchedules if schedules array have something', () => {
    const initialState = { schedulesReducer: { schedules: [{}] } }
    const wrapper = wrapperFactory(initialState)
    render(<Schedules />, { wrapper })
    expect(loadSchedules).not.toHaveBeenCalled()
  })
})
