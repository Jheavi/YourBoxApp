import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import { updateSession, createSession, deleteSession } from '../../../redux/actions/schedulesActions'
import FormModifySession from './FormModifySession'

jest.mock('../../../redux/actions/schedulesActions')

const buildStore = configureStore([thunk])

describe('FormModifySession', () => {
  let fakeSession
  let initialState: any
  let wrapper: any
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

  beforeEach(() => {
    initialState = { userReducer: { user: { ownerOfBox: {} } } }
    wrapper = wrapperFactory(initialState)
  })

  afterEach(() => {
    initialState = null
    wrapper = null
    jest.resetAllMocks()
  })

  it('renders correctly', () => {
    const { getByTestId } = render(<FormModifySession day={day}/>, { wrapper })

    const title = getByTestId('textTitle')

    expect(title.children[0]).toBe('New day')
  })

  it('Save button should call createSession if there is not session', () => {
    const { getByTestId } = render(<FormModifySession day={day} session={null}/>, { wrapper })

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
    const { getByTestId } = render(<FormModifySession day={day} session={fakeSession}/>, { wrapper })

    const saveButton = getByTestId('saveButton')
    fireEvent(saveButton, 'press')

    expect(updateSession).toHaveBeenCalled()
  })

  it('Delete button should call deleteSession', () => {
    fakeSession = {
      finishHour: '10:00',
      startHour: '09:00',
      type: 'WOD'
    }
    const { getByTestId } = render(<FormModifySession day={day} session={fakeSession}/>, { wrapper })

    const deleteButton = getByTestId('deleteButton')
    fireEvent(deleteButton, 'press')

    expect(deleteSession).toHaveBeenCalled()
  })

  it('should change the start hour', () => {
    fakeSession = {
      finishHour: '10:00',
      startHour: '09:00',
      type: 'WOD'
    }
    const newHour = '12:00'
    const { getByTestId } = render(<FormModifySession day={day} session={fakeSession}/>, { wrapper })

    const startHourPicker = getByTestId('startHourPicker')

    fireEvent(startHourPicker, 'ValueChange', newHour, 0)
    const selectedIndex = startHourPicker.props.selected

    expect(startHourPicker.props.items[selectedIndex].value).toBe(newHour)
  })

  it('should change the start hour and the finish hour to one hour more', () => {
    fakeSession = {
      finishHour: '10:00',
      startHour: '09:00',
      type: 'WOD'
    }
    const newHour = '07:00'
    const { getAllByTestId } = render(<FormModifySession day={day} session={fakeSession}/>, { wrapper })

    const [startHourPicker, finishHourPicker] = getAllByTestId(/hourPicker/i)

    fireEvent(startHourPicker, 'ValueChange', newHour, 0)
    const selectedIndex = finishHourPicker.props.selected

    expect(finishHourPicker.props.items[selectedIndex].value).toBe('08:00')
  })

  it('should change the finish hour', () => {
    fakeSession = {
      finishHour: '10:00',
      startHour: '09:00',
      type: 'WOD'
    }
    const newHour = '11:00'
    const { getByTestId } = render(<FormModifySession day={day} session={fakeSession}/>, { wrapper })

    const finishHourPicker = getByTestId('finishHourPicker')

    fireEvent(finishHourPicker, 'ValueChange', newHour, 0)
    const selectedIndex = finishHourPicker.props.selected

    expect(finishHourPicker.props.items[selectedIndex].value).toBe(newHour)
  })

  it('should change the start hour if the finish hour selected is before the start hour and before "10:00"', () => {
    fakeSession = {
      finishHour: '10:00',
      startHour: '09:00',
      type: 'WOD'
    }
    const newHour = '08:00'
    const { getAllByTestId } = render(<FormModifySession day={day} session={fakeSession}/>, { wrapper })

    const [startHourPicker, finishHourPicker] = getAllByTestId(/hourPicker/i)

    fireEvent(finishHourPicker, 'ValueChange', newHour, 0)
    const selectedIndex = startHourPicker.props.selected

    expect(startHourPicker.props.items[selectedIndex].value).toBe('07:00')
  })

  it('should change the start hour if the finish hour selected is before the start hour and after "10:00"', () => {
    fakeSession = {
      finishHour: '15:00',
      startHour: '14:00',
      type: 'WOD'
    }
    const newHour = '13:00'
    const { getAllByTestId } = render(<FormModifySession day={day} session={fakeSession}/>, { wrapper })

    const [startHourPicker, finishHourPicker] = getAllByTestId(/hourPicker/i)

    fireEvent(finishHourPicker, 'ValueChange', newHour, 0)
    const selectedIndex = startHourPicker.props.selected

    expect(startHourPicker.props.items[selectedIndex].value).toBe('12:00')
  })

  it('should change the session type', () => {
    fakeSession = {
      finishHour: '10:00',
      startHour: '09:00',
      type: 'WOD'
    }
    const newType = 'Open Box'
    const { getByTestId } = render(<FormModifySession day={day} session={fakeSession}/>, { wrapper })

    const typePicker = getByTestId('typePicker')

    fireEvent(typePicker, 'ValueChange', newType, 0)
    const selectedIndex = typePicker.props.selected

    expect(typePicker.props.items[selectedIndex].value).toBe(newType)
  })
})
