import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { render } from '@testing-library/react-native'
import UserResults from './UserResults'

jest.mock('./ResultDetail/ResultDetail')

const buildStore = configureStore([thunk])

describe('UserResults', () => {
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
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders correctly', () => {
    const initialState = { userReducer: { user: { pastSessions: [] } } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<UserResults />, { wrapper })

    const title = getByTestId('programsTitle')

    expect(title.children[0]).toBe('Your bookings and results')
  })

  it('should render three ResultDetail components with a pastSessions array with length 3', () => {
    const fakePastSessions = [
      { finishHour: '1', startHour: '1', type: '1', day: '123' },
      { finishHour: '2', startHour: '2', type: '2', day: '123' },
      { finishHour: '3', startHour: '3', type: '3', day: '123' }
    ]
    const initialState = { userReducer: { user: { pastSessions: fakePastSessions } } }
    const wrapper = wrapperFactory(initialState)
    const { getAllByText } = render(<UserResults />, { wrapper })

    const resultDetails = getAllByText(/MockedResultDetail/)

    expect(resultDetails.length).toBe(3)
  })
})
