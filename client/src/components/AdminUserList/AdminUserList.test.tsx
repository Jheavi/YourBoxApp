import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { render } from '@testing-library/react-native'
import { loadUsers } from '../../redux/actions/userActions'
import AdminUserList from './AdminUserList'

jest.mock('../../redux/actions/userActions')
jest.mock('./UserListDetail/UserListDetail')

const buildStore = configureStore([thunk])

describe('Programs', () => {
  let initialState: any
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
    initialState = { userReducer: { user: { ownerOfBox: {} }, users: [] } }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders correctly', () => {
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<AdminUserList />, { wrapper })

    const title = getByTestId('usersTitle')

    expect(title.children[0]).toBe('Your Users')
  })

  it('should call loadUsers', () => {
    const wrapper = wrapperFactory(initialState)
    render(<AdminUserList />, { wrapper })
    expect(loadUsers).toHaveBeenCalled()
  })

  it('should render three UserListDetail components with a users array with length 4', () => {
    initialState = {
      userReducer: {
        user: { ownerOfBox: {} },
        users: [
          { name: 'a' },
          { name: 'a' },
          { name: 'a' },
          { name: 'a' }
        ]
      }
    }
    const wrapper = wrapperFactory(initialState)
    const { getAllByText } = render(<AdminUserList />, { wrapper })

    const UserListDetailComponents = getAllByText(/MockedUserListDetail/)

    expect(UserListDetailComponents.length).toBe(4)
  })
})
