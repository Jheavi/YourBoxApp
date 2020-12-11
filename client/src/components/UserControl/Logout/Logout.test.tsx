import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import { logout } from '../../../redux/actions/userActions'
import Logout from './Logout'

jest.mock('../../../redux/actions/userActions')

const buildStore = configureStore([thunk])

describe('Logout', () => {
  let initialState: any
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
    initialState = { userReducer: { user: { ownerOfBox: {} } } }
    wrapper = wrapperFactory(initialState)
  })

  afterEach(() => {
    initialState = null
    wrapper = null
    jest.resetAllMocks()
  })

  it('renders correctly the logout button', () => {
    const { getByTestId } = render(<Logout />, { wrapper })

    const logoutButtonText = getByTestId('logoutBtnText')

    expect(logoutButtonText.children[0]).toBe('Logout')
  })

  it('should call the logout action with the logout button', () => {
    const { getByTestId } = render(<Logout />, { wrapper })

    const logoutButton = getByTestId('logoutBtn')
    fireEvent.press(logoutButton)

    expect(logout).toHaveBeenCalled()
  })
})
