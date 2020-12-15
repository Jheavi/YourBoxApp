import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import SessionItem from './SessionItem'
import { SessionInterface } from '../../../interfaces/interfaces'

jest.mock('../FormModifySession/FormModifySession')

const buildStore = configureStore([thunk])

describe('SessionItem', () => {
  let fakeSession: SessionInterface
  let initialState
  let wrapper: any
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

  beforeEach(() => {
    initialState = { userReducer: { user: { admin: true } } }
    wrapper = wrapperFactory(initialState)
    fakeSession = { finishHour: '10:00', startHour: '09:00', type: 'WOD' }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders correctly', () => {
    const { getByTestId } = render(<SessionItem day={day} session={fakeSession}/>, { wrapper })

    const hourText = getByTestId('hourText')

    expect(hourText.children[0]).toBe('09:00 - 10:00')
  })

  it('should render background color of session type WOD correctly', () => {
    const { getByTestId } = render(<SessionItem day={day} session={fakeSession}/>, { wrapper })

    const sessionContainer = getByTestId('sessionContainer')

    expect(sessionContainer.props.style.backgroundColor).toBe('#014aa5')
  })

  it('should render background color of session type Open Box correctly', () => {
    fakeSession = { finishHour: '10:00', startHour: '09:00', type: 'Open Box' }
    const { getByTestId } = render(<SessionItem day={day} session={fakeSession}/>, { wrapper })

    const sessionContainer = getByTestId('sessionContainer')

    expect(sessionContainer.props.style.backgroundColor).toBe('#016500')
  })

  it('should render background color of session type Olympics correctly', () => {
    fakeSession = { finishHour: '10:00', startHour: '09:00', type: 'Olympics' }
    const { getByTestId } = render(<SessionItem day={day} session={fakeSession}/>, { wrapper })

    const sessionContainer = getByTestId('sessionContainer')

    expect(sessionContainer.props.style.backgroundColor).toBe('#a20000')
  })

  it('should change the modal to visible if touchableModal is touched', () => {
    const { getAllByTestId } = render(<SessionItem day={day} session={fakeSession}/>, { wrapper })

    const [touchableModal, modal] = getAllByTestId(/Modal/)

    fireEvent.press(touchableModal)

    expect(modal.props.visible).toBe(true)
  })

  it('should change the modal to no-visible if backDropPress', () => {
    const { getAllByTestId } = render(<SessionItem day={day} session={fakeSession}/>, { wrapper })

    const [touchableModal, modal] = getAllByTestId(/Modal/)

    fireEvent.press(touchableModal)
    fireEvent(modal, 'backdropPress')

    expect(modal.props.visible).toBe(false)
  })
})
