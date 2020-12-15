import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import { userInterface } from '../../../interfaces/interfaces'
import { toggleUserActive } from '../../../redux/actions/userActions'
import UserListDetail from './UserListDetail'

jest.mock('../FormChangeUserProgram/FormChangeUserProgram')
jest.mock('../../../redux/actions/userActions')

const buildStore = configureStore([thunk])

describe('ProgramDetail', () => {
  let initialState: any
  let fakeAffiliatedUser: userInterface
  let wrapper: any
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
    wrapper = wrapperFactory(initialState)
    fakeAffiliatedUser = {
      active: false,
      admin: false,
      avatar: 'a',
      affiliatedBox: {
        _id: '123',
        name: '123',
        direction: '123',
        affiliates: [],
        owner: '1',
        photos: []
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
    jest.resetAllMocks()
  })

  it('renders correctly the user\'s name', () => {
    const { getByTestId } = render(<UserListDetail affiliatedUser={fakeAffiliatedUser}/>, { wrapper })

    const programName = getByTestId('userName')

    expect(programName.children[0]).toBe('fakeName')
  })

  it('should render "Inactivate" in the button if the user is active', () => {
    fakeAffiliatedUser = { ...fakeAffiliatedUser, active: true }
    const { getByTestId } = render(<UserListDetail affiliatedUser={fakeAffiliatedUser}/>, { wrapper })

    const activateButtonText = getByTestId('activateBtnText')

    expect(activateButtonText.children[0]).toBe('Inactivate')
  })

  it('should render "Activate" in the button if the user is inactive', () => {
    fakeAffiliatedUser = { ...fakeAffiliatedUser, active: false }
    const { getByTestId } = render(<UserListDetail affiliatedUser={fakeAffiliatedUser}/>, { wrapper })

    const activateButtonText = getByTestId('activateBtnText')

    expect(activateButtonText.children[0]).toBe('Activate')
  })

  it('should render "none" if the user doesn\'t have a program', () => {
    fakeAffiliatedUser = { ...fakeAffiliatedUser, affiliatedProgram: undefined }
    const { getByTestId } = render(<UserListDetail affiliatedUser={fakeAffiliatedUser}/>, { wrapper })

    const affiliatedProgramName = getByTestId('affiliatedProgramName')

    expect(affiliatedProgramName.children[0]).toBe('none')
  })

  it('should set modal to visible if "actual program" is touched', () => {
    const { getAllByTestId } = render(<UserListDetail affiliatedUser={fakeAffiliatedUser} />, { wrapper })

    const [touchableModal, modal] = getAllByTestId(/Modal/)

    fireEvent.press(touchableModal)

    expect(modal.props.visible).toBe(true)
  })

  it('should change the modal to no-visible if backDropPress', () => {
    const { getAllByTestId } = render(<UserListDetail affiliatedUser={fakeAffiliatedUser} />, { wrapper })

    const [touchableModal, modal] = getAllByTestId(/Modal/)

    fireEvent.press(touchableModal)
    fireEvent(modal, 'backdropPress')

    expect(modal.props.visible).toBe(false)
  })

  it('should call toggleUserActive if activate button is pressed', () => {
    const { getByTestId } = render(<UserListDetail affiliatedUser={fakeAffiliatedUser} />, { wrapper })

    const activateButton = getByTestId('activateBtn')

    fireEvent.press(activateButton)

    expect(toggleUserActive).toHaveBeenCalledWith(fakeAffiliatedUser)
  })
})
