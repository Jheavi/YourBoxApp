import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import { userInterface } from '../../interfaces/interfaces'

import Navigation from './Navigation'
import { act } from 'react-test-renderer'

const buildStore = configureStore([thunk])

describe('Navigation', () => {
  let fakeUser: userInterface
  let fakeAdmin: userInterface
  const wrapperFactory = (wrapperInitialState: any) => {
    const store = buildStore(wrapperInitialState)
    store.dispatch = jest.fn()

    return ({ children }:{children: ReactElement}): ReactElement => (
      <Provider store={store}>
        <NavigationContainer>
          {children}
        </NavigationContainer>
      </Provider>
    )
  }

  beforeEach(() => {
    fakeUser = {
      active: false,
      admin: false,
      affiliatedProgram: {
        _id: '12345',
        name: 'fakeProgramName',
        sessionsPerMonth: 8,
        box: '456'
      },
      avatar: 'a',
      connection: 'a',
      email: 'a',
      name: 'a',
      pastSessions: [],
      reservedSessions: [],
      signInDate: 'a',
      userId: 'a'
    }
    fakeAdmin = {
      ...fakeUser,
      admin: true
    }
  })

  it('render the login component if there is no user', async () => {
    const initialState = { userReducer: {}, boxReducer: {} }
    const wrapper = wrapperFactory(initialState)
    const { getByText } = render(<Navigation />, { wrapper })
    const loginButton = getByText(/Login/)

    await act(async () => { expect(loginButton).toBeDefined() })
  })

  it('render the UserHome component if there is a non-admin user', async () => {
    const initialState = { userReducer: { user: fakeUser, pastSessionsThisMonth: [], reservedSessionsThisMonth: [] } }
    const wrapper = wrapperFactory(initialState)
    const { getByText } = render(<Navigation />, { wrapper })
    const workoutButton = getByText(/Workout of the day/)

    await act(async () => { expect(workoutButton).toBeDefined() })
  })

  it('render the AdminHome component if there is an admin user', async () => {
    const initialState = { userReducer: { user: fakeAdmin } }
    const wrapper = wrapperFactory(initialState)
    const { getByText } = render(<Navigation />, { wrapper })
    const usersButton = getByText(/Your users/)

    await act(async () => { expect(usersButton).toBeDefined() })
  })
})
