import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import ProgramDetail from './ProgramDetail'
import { ProgramInterface } from '../../../interfaces/interfaces'

jest.mock('../FormModifyProgram/FormModifyProgram')

const buildStore = configureStore([thunk])

describe('ProgramDetail', () => {
  let initialState: any
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
    initialState = {}
    fakeProgram = {
      _id: '12345',
      name: 'fakeName',
      sessionsPerMonth: 8,
      box: '456'
    }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders correctly the program\'s name', () => {
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<ProgramDetail program={fakeProgram}/>, { wrapper })

    const programName = getByTestId('programName')

    expect(programName.children[0]).toBe(fakeProgram.name)
  })

  it('renders correctly the program\'s sessions', () => {
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<ProgramDetail program={fakeProgram}/>, { wrapper })

    const programName = getByTestId('programSessions')

    expect(programName.children[0]).toBe(`per month: ${fakeProgram.sessionsPerMonth}`)
  })

  it('should set modal to visible if create button is touched', () => {
    const wrapper = wrapperFactory(initialState)
    const { getAllByTestId } = render(<ProgramDetail program={fakeProgram} />, { wrapper })

    const [touchableModal, modal] = getAllByTestId(/Modal/)

    fireEvent.press(touchableModal)

    expect(modal.props.visible).toBe(true)
  })

  it('should change the modal to no-visible if backDropPress', () => {
    const wrapper = wrapperFactory(initialState)
    const { getAllByTestId } = render(<ProgramDetail program={fakeProgram} />, { wrapper })

    const [touchableModal, modal] = getAllByTestId(/Modal/)

    fireEvent.press(touchableModal)
    fireEvent(modal, 'backdropPress')

    expect(modal.props.visible).toBe(false)
  })
})
