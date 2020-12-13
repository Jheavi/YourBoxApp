import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import UserButton from './UserButton'

jest.mock('@react-navigation/native')

const buildStore = configureStore([thunk])

describe('UserHome', () => {
  let navigation: {navigate: jest.Mock<any, any>}
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
    navigation = {
      navigate: jest.fn()
    }
    const initialState = {}
    wrapper = wrapperFactory(initialState)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders correctly', () => {
    const { getByTestId } = render(<UserButton />, { wrapper })

    const userButton = getByTestId('userButton')

    expect(userButton).toBeDefined()
  })

  it('should call navigation.navigate with argument "UserProfile"', () => {
    const { getByTestId } = render(<UserButton navigation={navigation}/>, { wrapper })

    const userButton = getByTestId('userButton')
    fireEvent.press(userButton)

    expect(navigation.navigate).toHaveBeenCalledWith('UserProfile')
  })
})
