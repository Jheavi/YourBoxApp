import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import Header from './Header'

const buildStore = configureStore([thunk])

describe('Header', () => {
  let navigation: {navigate: jest.Mock<any, any>}
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
    navigation = {
      navigate: jest.fn()
    }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders correctly the app name', () => {
    const initialState = { userReducer: { user: {} } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<Header />, { wrapper })

    const title = getByTestId('appName')

    expect(title.children[0]).toBe('YourBoxApp')
  })

  it('should call navigation.navigate to Login page if there is no user', () => {
    const initialState = { userReducer: { user: null } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<Header navigation={navigation}/>, { wrapper })

    const navigateButton = getByTestId('navigateBtn')
    fireEvent.press(navigateButton)

    expect(navigation.navigate).toHaveBeenCalledWith('Login')
  })

  it('should call navigation.navigate to AdminHome page if user is admin', () => {
    const initialState = { userReducer: { user: { admin: true } } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<Header navigation={navigation}/>, { wrapper })

    const navigateButton = getByTestId('navigateBtn')
    fireEvent.press(navigateButton)

    expect(navigation.navigate).toHaveBeenCalledWith('Home')
  })

  it('should call navigation.navigate to UserHome page if user is not admin', () => {
    const initialState = { userReducer: { user: { admin: false } } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<Header navigation={navigation}/>, { wrapper })

    const navigateButton = getByTestId('navigateBtn')
    fireEvent.press(navigateButton)

    expect(navigation.navigate).toHaveBeenCalledWith('UserHome')
  })
})
