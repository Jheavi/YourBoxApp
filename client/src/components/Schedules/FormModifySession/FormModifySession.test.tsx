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
    const selectedIndex = startHourPicker.props.selectedIndex

    expect(startHourPicker.props.items[selectedIndex].value).toBe(newHour)
  })

  it('should change the start hour and the finish hour to one hour more', () => {
    fakeSession = {
      finishHour: '10:00',
      startHour: '09:00',
      type: 'WOD'
    }
    const newHour = '07:00'
    const initialState = {}
    const wrapper = wrapperFactory(initialState)
    const { getAllByTestId } = render(<FormModifySession setModalVisible={setModalVisible} day={day} session={fakeSession}/>, { wrapper })

    const [startHourPicker, finishHourPicker] = getAllByTestId(/hourPicker/i)

    fireEvent(startHourPicker, 'ValueChange', newHour)
    const selectedIndex = finishHourPicker.props.selectedIndex

    expect(finishHourPicker.props.items[selectedIndex].value).toBe('08:00')
  })

  it('should change the finish hour', () => {
    fakeSession = {
      finishHour: '10:00',
      startHour: '09:00',
      type: 'WOD'
    }
    const newHour = '11:00'
    const initialState = {}
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifySession setModalVisible={setModalVisible} day={day} session={fakeSession}/>, { wrapper })

    const finishHourPicker = getByTestId('finishHourPicker')

    fireEvent(finishHourPicker, 'ValueChange', newHour)
    const selectedIndex = finishHourPicker.props.selectedIndex

    expect(finishHourPicker.props.items[selectedIndex].value).toBe(newHour)
  })

  it('should change the session type', () => {
    fakeSession = {
      finishHour: '10:00',
      startHour: '09:00',
      type: 'WOD'
    }
    const newType = 'Open Box'
    const initialState = {}
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifySession setModalVisible={setModalVisible} day={day} session={fakeSession}/>, { wrapper })

    const typePicker = getByTestId('typePicker')

    fireEvent(typePicker, 'ValueChange', newType)
    const selectedIndex = typePicker.props.selectedIndex

    expect(typePicker.props.items[selectedIndex].value).toBe(newType)
  })
})
