import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import { login } from '../../../redux/actions/userActions'
import * as AuthSession from 'expo-auth-session'
import Login from './Login'

jest.mock('@react-navigation/native')
jest.mock('expo-auth-session')
jest.mock('../../../redux/actions/userActions')

const buildStore = configureStore([thunk])

describe('UserHome', () => {
  let navigation: {navigate: jest.Mock<any, any>}
  let request: AuthSession.AuthRequest | null
  let result: any
  let promptAsync: jest.Mock<any, any>
  let spyUseAuth: any

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
    navigation = { navigate: jest.fn() }
    promptAsync = jest.fn()
    request = null
  })

  afterEach(() => {
    spyUseAuth.mockRestore()
  })

  it('renders correctly', () => {
    spyUseAuth = jest.spyOn(AuthSession, 'useAuthRequest').mockReturnValueOnce([
      request,
      result,
      promptAsync
    ])
    const initialState = { }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<Login navigation={navigation}/>, { wrapper })

    const title = getByTestId('title')

    expect(title.children[0]).toBe('See gyms around you')
  })

  it('should call login action with the id_token if login button is pressed and result type is success', async () => {
    result = {
      type: 'success',
      params: { id_token: 'id_token' },
      errorCode: null,
      authentication: null,
      url: 'a'
    }
    promptAsync = jest.fn()
    spyUseAuth = jest.spyOn(AuthSession, 'useAuthRequest').mockReturnValueOnce([
      request,
      result,
      promptAsync
    ])

    const initialState = { }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<Login navigation={navigation}/>, { wrapper })

    const loginButton = getByTestId('loginButton')
    fireEvent.press(loginButton)

    expect(login).toHaveBeenCalledWith('id_token')
  })
})
