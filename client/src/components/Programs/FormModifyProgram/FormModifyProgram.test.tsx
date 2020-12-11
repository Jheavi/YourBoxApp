import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import { updateProgram, createProgram } from '../../../redux/actions/programActions'
import FormModifyProgram from './FormModifyProgram'
import { ProgramInterface } from '../../../interfaces/interfaces'

jest.mock('../../../redux/actions/programActions')

const buildStore = configureStore([thunk])

describe('FormModifyProgram', () => {
  let initialState: any
  let wrapper: any
  let fakeProgram: ProgramInterface
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
    fakeProgram = {
      _id: '12345',
      name: 'fakeName',
      sessionsPerMonth: 8,
      box: '456'
    }
  })

  afterEach(() => {
    initialState = null
    wrapper = null
    jest.resetAllMocks()
  })

  it('renders correctly the button with "Save changes" if there is a program to change', () => {
    const { getByTestId } = render(<FormModifyProgram program={fakeProgram}/>, { wrapper })

    const saveButton = getByTestId('buttonText')

    expect(saveButton.children[0]).toBe('Save changes')
  })

  it('renders correctly the button with "Create program" to create a new program ', () => {
    const { getByTestId } = render(<FormModifyProgram program={null}/>, { wrapper })

    const saveButton = getByTestId('buttonText')

    expect(saveButton.children[0]).toBe('Create program')
  })

  it('should change the name', () => {
    const changedName = 'Changed Name'
    const { getByTestId } = render(<FormModifyProgram program={fakeProgram}/>, { wrapper })

    const inputName = getByTestId('inputName')
    fireEvent.changeText(inputName, changedName)

    expect(inputName.props.value).toBe(changedName)
  })

  it('should change the sessions', () => {
    const changedSessions = '12'
    const { getByTestId } = render(<FormModifyProgram program={fakeProgram}/>, { wrapper })

    const inputSessions = getByTestId('inputSessions')
    fireEvent.changeText(inputSessions, changedSessions)

    expect(inputSessions.props.value).toBe(changedSessions)
  })

  it('should call updateProgram action if it\'s changing a program', () => {
    const { getByTestId } = render(<FormModifyProgram program={fakeProgram}/>, { wrapper })

    const saveButton = getByTestId('saveButton')
    fireEvent.press(saveButton)

    expect(updateProgram).toHaveBeenCalled()
  })

  it('should call createProgram action if it\'s creating a new program', () => {
    const { getByTestId } = render(<FormModifyProgram program={null}/>, { wrapper })

    const saveButton = getByTestId('saveButton')
    fireEvent.press(saveButton)

    expect(createProgram).toHaveBeenCalled()
  })
})
