import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import { login } from '../../redux/actions/userActions'
import * as AuthSession from 'expo-auth-session'
import Login from './Login'
import { loadBoxes } from '../../redux/actions/boxActions'

jest.mock('@react-navigation/native')
jest.mock('expo-auth-session')
jest.mock('../../redux/actions/userActions')
jest.mock('../../redux/actions/boxActions')
jest.mock('../BoxDetail/Boxdetail')

const buildStore = configureStore([thunk])

describe('Login', () => {
  let navigation: {navigate: jest.Mock<any, any>}
  let request: AuthSession.AuthRequest | null
  let wrapper: any
  let result: any
  let initialState: any
  let promptAsync: jest.Mock<any, any>

  const wrapperFactory = (wrapperInitialState: any) => {
    const store = buildStore(wrapperInitialState)
    store.dispatch = jest.fn()

    return ({ children }:{children: ReactElement}): ReactElement => (
      <Provider store={store}>
        {children}
      </Provider>
    )
  }

  const mockUseAuthRequest = (defineResult: any) => {
    return jest.spyOn(AuthSession, 'useAuthRequest').mockReturnValueOnce([
      request,
      defineResult,
      promptAsync
    ])
  }

  beforeEach(() => {
    navigation = { navigate: jest.fn() }
    promptAsync = jest.fn()
    request = null
    initialState = { boxReducer: {} }
    wrapper = wrapperFactory(initialState)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders correctly', () => {
    mockUseAuthRequest(null)
    const { getByTestId } = render(<Login navigation={navigation}/>, { wrapper })

    const title = getByTestId('title')

    expect(title.children[0]).toBe('See gyms around you')
  })

  it('should call loadBoxes if there is no boxes', () => {
    mockUseAuthRequest(null)
    render(<Login navigation={navigation}/>, { wrapper })

    expect(loadBoxes).toHaveBeenCalled()
  })

  it('should call login action with the id_token if login button is pressed and result type is success', async () => {
    result = {
      type: 'success',
      params: { id_token: 'id_token' },
      errorCode: null,
      authentication: null,
      url: 'a'
    }
    mockUseAuthRequest(result)
    const { getByTestId } = render(<Login navigation={navigation}/>, { wrapper })

    const loginButton = getByTestId('loginButton')
    fireEvent.press(loginButton)

    expect(login).toHaveBeenCalledWith('id_token')
  })

  it('should not call login action if result type is error', async () => {
    result = {
      type: 'error',
      params: { error_description: 'error' },
      errorCode: null,
      authentication: null,
      url: 'a'
    }
    mockUseAuthRequest(result)
    const { getByTestId } = render(<Login navigation={navigation}/>, { wrapper })

    const loginButton = getByTestId('loginButton')
    fireEvent.press(loginButton)

    expect(login).not.toHaveBeenCalled()
  })

  it('should render two BoxDetail components with a programs array with length 2', () => {
    initialState = {
      boxReducer: {
        boxes: [
          { name: 'a' },
          { name: 'a' }
        ]
      }
    }
    wrapper = wrapperFactory(initialState)
    mockUseAuthRequest(null)
    const { getAllByText } = render(<Login navigation={navigation} />, { wrapper })

    const boxDetailComponents = getAllByText(/MockedBoxDetail/)

    expect(boxDetailComponents.length).toBe(2)
  })
})
