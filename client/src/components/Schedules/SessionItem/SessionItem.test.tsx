import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import SessionItem from './SessionItem'

jest.mock('../FormModifySession/FormModifySession')

const buildStore = configureStore([thunk])

describe('Workout', () => {
  let session
  const day = 'New Day'
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
    session = { finishHour: '10:00', startHour: '09:00', type: 'WOD' }
    const initialState = {}
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<SessionItem day={day} session={session}/>, { wrapper })

    const hourText = getByTestId('hourText')

    expect(hourText.children[0]).toBe('09:00 - 10:00')
  })

  it('should change the modal to visible if touchableModal is touched', () => {
    session = { finishHour: '10:00', startHour: '09:00', type: 'Open Box' }
    const initialState = {}
    const wrapper = wrapperFactory(initialState)
    const { getAllByTestId } = render(<SessionItem day={day} session={session}/>, { wrapper })

    const [touchableModal, modal] = getAllByTestId(/Modal/)

    fireEvent(touchableModal, 'press')

    expect(modal.props.visible).toBe(true)
  })

  it('should render type Olympics correcly', () => {
    session = { finishHour: '10:00', startHour: '09:00', type: 'Olympics' }
    const initialState = {}
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<SessionItem day={day} session={session}/>, { wrapper })

    const hourText = getByTestId('typeText')

    expect(hourText.children[0]).toBe('Olympics')
  })
})
