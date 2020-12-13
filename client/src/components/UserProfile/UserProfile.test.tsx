import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import { logout } from '../../redux/actions/userActions'
import UserProfile from './UserProfile'

jest.mock('../../redux/actions/userActions')

const buildStore = configureStore([thunk])

describe('UserProfile', () => {
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
    initialState = {
      userReducer: {
        user: {
          admin: true,
          ownerOfBox: {
            name: 'fakeBox',
            affiliates: []
          }
        }
      }
    }
    wrapper = wrapperFactory(initialState)
  })

  afterEach(() => {
    initialState = null
    wrapper = null
    jest.resetAllMocks()
  })

  it('renders correctly the logout button', () => {
    const { getByTestId } = render(<UserProfile />, { wrapper })

    const logoutButtonText = getByTestId('logoutBtnText')

    expect(logoutButtonText.children[0]).toBe('Logout')
  })

  it('should call the logout action with the logout button', () => {
    const { getByTestId } = render(<UserProfile />, { wrapper })

    const logoutButton = getByTestId('logoutBtn')
    fireEvent.press(logoutButton)

    expect(logout).toHaveBeenCalled()
  })

  it('should render the name of the box owned if user is admin', () => {
    const { getByTestId } = render(<UserProfile />, { wrapper })

    const boxName = getByTestId('boxOwnerName')

    expect(boxName.children[0]).toBe('fakeBox')
  })

  describe('user not admin profile', () => {
    beforeEach(() => {
      initialState = {
        userReducer: {
          user: {
            admin: false,
            active: true,
            affiliatedBox: { name: 'fakeBox' },
            affiliatedProgram: { name: 'program1', sessionsPerMonth: 3 }
          }
        }
      }
      wrapper = wrapperFactory(initialState)
    })

    it('should render the name of the box if user is affiliated to a box', () => {
      const { getByTestId } = render(<UserProfile />, { wrapper })

      const boxName = getByTestId('boxNonOwnerName')

      expect(boxName.children[0]).toBe('fakeBox')
    })

    it('should render "not affiliated" if user is not affiliated to a box', () => {
      initialState = {
        userReducer: {
          user: {
            admin: false,
            active: true,
            affiliatedBox: null,
            affiliatedProgram: null
          }
        }
      }
      wrapper = wrapperFactory(initialState)
      const { getByTestId } = render(<UserProfile />, { wrapper })

      const notAffiliatedText = getByTestId('notAffiliated')

      expect(notAffiliatedText.children[0]).toBe('Actually not affiliated')
    })

    it('should render "yes" if user is active', () => {
      const { getByTestId } = render(<UserProfile />, { wrapper })

      const userActive = getByTestId('userActive')

      expect(userActive.children[0]).toBe('Active: Yes')
    })

    it('should render "no" if user is inactive', () => {
      initialState = {
        userReducer: {
          user: {
            admin: false,
            active: false,
            affiliatedBox: { name: 'fakeBox' },
            affiliatedProgram: { name: 'program1', sessionsPerMonth: 3 }
          }
        }
      }
      wrapper = wrapperFactory(initialState)
      const { getByTestId } = render(<UserProfile />, { wrapper })

      const userActive = getByTestId('userActive')

      expect(userActive.children[0]).toBe('Active: No')
    })

    it('should render "no" if user has no active program', () => {
      initialState = {
        userReducer: {
          user: {
            admin: false,
            active: true,
            affiliatedBox: { name: 'fakeBox' },
            affiliatedProgram: null
          }
        }
      }
      wrapper = wrapperFactory(initialState)
      const { getByTestId } = render(<UserProfile />, { wrapper })

      const programName = getByTestId('programName')

      expect(programName.children[0]).toBe('Active program: No')
    })
  })
})
