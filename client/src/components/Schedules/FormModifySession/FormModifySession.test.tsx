import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import { updateSession, createSession } from '../../../redux/actions/schedulesActions'
import FormModifySession from './FormModifySession'

jest.mock('../../../redux/actions/schedulesActions')

const buildStore = configureStore([thunk])

describe('Workout', () => {
  let setModalVisible: Function
  let fakeSession
  const day = 'New day'
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
    setModalVisible = jest.fn()
  })

  afterEach(() => {
    global.performance = performance
    jest.resetAllMocks()
  })

  it('renders correctly', () => {
    const initialState = { }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifySession setModalVisible={setModalVisible} day={day}/>, { wrapper })

    const title = getByTestId('textTitle')

    expect(title.children[0]).toBe('New day')
  })

  it('Save button should call createSession if there is not session', () => {
    const initialState = { }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifySession setModalVisible={setModalVisible} day={day}/>, { wrapper })

    const saveButton = getByTestId('saveButton')
    fireEvent(saveButton, 'press')

    expect(createSession).toHaveBeenCalled()
  })

  it('Save button should call updateSession if there is session', () => {
    fakeSession = {
      finishHour: '10:00',
      startHour: '09:00',
      type: 'WOD'
    }
    const initialState = {}
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifySession setModalVisible={setModalVisible} day={day} session={fakeSession}/>, { wrapper })

    const saveButton = getByTestId('saveButton')
    fireEvent(saveButton, 'press')

    expect(updateSession).toHaveBeenCalled()
  })

  it('should change the start hour', () => {
    fakeSession = {
      finishHour: '10:00',
      startHour: '09:00',
      type: 'WOD'
    }
    const newHour = '10:00'
    const initialState = {}
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifySession setModalVisible={setModalVisible} day={day} session={fakeSession}/>, { wrapper })

    const startHourPicker = getByTestId('startHourPicker')
    fireEvent(startHourPicker, 'ValueChange', newHour)

    expect(startHourPicker.props.selectedValue).toBe(newHour)
  })

  // it('should change the start hour and the finish hour to one hour more', () => {
  //   const newHour = '10:00'
  //   const initialState = {}
  //   const wrapper = wrapperFactory(initialState)
  //   const { getByTestId } = render(<FormModifySession setModalVisible={setModalVisible} day={day} session={{}}/>, { wrapper })

  //   const startHourPicker = getByTestId('startHourPicker')
  //   fireEvent.changeValue(startHourPicker, newHour)

  //   expect(startHourPicker.props.value).toBe(newHour)
  // })
})
