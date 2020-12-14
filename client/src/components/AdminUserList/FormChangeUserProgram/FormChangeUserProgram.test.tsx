import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import { loadPrograms } from '../../../redux/actions/programActions'
import { updateUserProgram } from '../../../redux/actions/userActions'
import { userInterface } from '../../../interfaces/interfaces'
import FormChangeUserProgram from './FormChangeUserProgram'

jest.mock('../../../redux/actions/programActions')
jest.mock('../../../redux/actions/userActions')

const buildStore = configureStore([thunk])

describe('FormChangeUserProgram', () => {
  let initialState: any
  let fakeAffiliatedUser: userInterface
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
    initialState = { programReducer: { programs: [{ name: 'fakeProgramName', _id: '12345' }, { name: 'bb', _id: '5678' }] }, userReducer: { user: { ownerOfBox: {} } } }
    fakeAffiliatedUser = {
      active: false,
      admin: false,
      avatar: 'a',
      affiliatedBox: {
        _id: '123',
        name: '123',
        direction: '123',
        affiliates: [],
        owner: '1'
      },
      affiliatedProgram: {
        _id: '12345',
        name: 'fakeProgramName',
        sessionsPerMonth: 8,
        box: '456'
      },
      connection: 'a',
      email: 'a',
      name: 'fakeName',
      pastSessions: [],
      reservedSessions: [],
      signInDate: 'a',
      userId: 'a'
    }
  })

  afterEach(() => {
    initialState = null
    jest.resetAllMocks()
  })

  it('renders correctly the button "Update Program"', () => {
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormChangeUserProgram affiliatedUser={fakeAffiliatedUser}/>, { wrapper })

    const updateButton = getByTestId('buttonText')

    expect(updateButton.children[0]).toBe('Update Program')
  })

  it('should call loadPrograms if activate button is pressed', () => {
    initialState = { programReducer: { programs: [] }, userReducer: { user: { ownerOfBox: { _id: 'fakeBoxId' } } } }
    const wrapper = wrapperFactory(initialState)
    render(<FormChangeUserProgram affiliatedUser={fakeAffiliatedUser} />, { wrapper })

    expect(loadPrograms).toHaveBeenCalledWith('fakeBoxId')
  })

  it('should change the program', () => {
    const newProgramName = 'bb'
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormChangeUserProgram affiliatedUser={fakeAffiliatedUser}/>, { wrapper })

    const programPicker = getByTestId('programPicker')

    fireEvent(programPicker, 'ValueChange', newProgramName, 0)
    const selectedIndex = programPicker.props.selected

    expect(programPicker.props.items[selectedIndex].value).toBe(newProgramName)
  })

  it('Save button should call updateUserProgram', () => {
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormChangeUserProgram affiliatedUser={fakeAffiliatedUser}/>, { wrapper })

    const saveButton = getByTestId('saveButton')
    fireEvent(saveButton, 'press')

    expect(updateUserProgram).toHaveBeenCalled()
  })
})
