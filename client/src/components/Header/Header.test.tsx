import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import { useNavigation } from '@react-navigation/native'
import Header from './Header'

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => ({ navigate: jest.fn() })
  }
})

const buildStore = configureStore([thunk])

describe('Header', () => {
  let navigation: any
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
    navigation = useNavigation()
  })

  afterEach(() => {
    navigation = null
    jest.resetAllMocks()
  })

  it('renders correctly the app name', () => {
    const initialState = { userReducer: { user: {} } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<Header />, { wrapper })

    const title = getByTestId('appName')

    expect(title.children[0]).toBe('YourBoxApp')
  })

  // it('should call navigation.navigate to Login page if there is no user', () => {
  //   const initialState = { userReducer: { user: null } }
  //   const wrapper = wrapperFactory(initialState)
  //   const { getByTestId } = render(<Header />, { wrapper })

  //   const navigateButton = getByTestId('navigateBtn')
  //   fireEvent.press(navigateButton)

  //   expect(navigation.navigate).toHaveBeenCalledWith('Login')
  // })
})
