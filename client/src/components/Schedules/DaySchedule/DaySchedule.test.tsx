import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import DaySchedule from './DaySchedule'

jest.mock('../SessionItem/SessionItem')
jest.mock('../FormModifySession/FormModifySession')

const buildStore = configureStore([thunk])

describe('DaySchedule', () => {
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

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders correctly', () => {
    weekDay = { day: 'New Day', sessions: [] }
    const initialState = { userReducer: { user: { admin: true } } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<DaySchedule weekDay={weekDay}/>, { wrapper })

    const title = getByTestId('dayScheduleTitle')

    expect(title.children[0]).toBe('New Day')
  })

  it('should render three SessionItem components with a sessions array with length 3', () => {
    weekDay = {
      day: 'New Day',
      sessions: [
        { finishHour: '1', startHour: '1', type: '1' },
        { finishHour: '2', startHour: '2', type: '2' },
        { finishHour: '3', startHour: '3', type: '3' }
      ]
    }
    const initialState = { userReducer: { user: { admin: true } } }
    const wrapper = wrapperFactory(initialState)
    const { getAllByText } = render(<DaySchedule weekDay={weekDay}/>, { wrapper })

    const sessionsItems = getAllByText(/MockedSessionItem/)

    expect(sessionsItems.length).toBe(3)
  })

  it('should change the modal to visible if touchableModal is touched', () => {
    weekDay = { day: 'New Day', sessions: [] }
    const initialState = { userReducer: { user: { admin: true } } }
    const wrapper = wrapperFactory(initialState)
    const { getAllByTestId } = render(<DaySchedule weekDay={weekDay}/>, { wrapper })

    const [touchableModal, modal] = getAllByTestId(/Modal/)

    fireEvent.press(touchableModal)

    expect(modal.props.visible).toBe(true)
  })

  it('should change the modal to no-visible if backDropPress', () => {
    weekDay = { day: 'New Day', sessions: [] }
    const initialState = { userReducer: { user: { admin: true } } }
    const wrapper = wrapperFactory(initialState)
    const { getAllByTestId } = render(<DaySchedule weekDay={weekDay}/>, { wrapper })

    const [touchableModal, modal] = getAllByTestId(/Modal/)

    fireEvent.press(touchableModal)
    fireEvent(modal, 'backdropPress')

    expect(modal.props.visible).toBe(false)
  })
})
