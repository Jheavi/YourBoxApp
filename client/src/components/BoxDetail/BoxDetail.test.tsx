import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import Boxdetail from './Boxdetail'
import { BoxInterface } from '../../interfaces/interfaces'

jest.mock('@react-navigation/native')
jest.mock('../../redux/actions/schedulesActions')

const buildStore = configureStore([thunk])

describe('Login', () => {
  let navigation: {navigate: jest.Mock<any, any>}
  let wrapper: any
  let initialState: any
  let fakeBox: BoxInterface

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
    fakeBox = {
      _id: '123',
      name: 'fakeName',
      owner: 'noOne',
      direction: 'noWhere',
      affiliates: [],
      photos: []
    }
    initialState = {}
    wrapper = wrapperFactory(initialState)
  })

  it('should render "See Schedules" button', async () => {
    const { getByTestId } = render(<Boxdetail navigation={navigation} box={fakeBox}/>, { wrapper })

    const seeSchedulesButtonText = getByTestId('seeSchedulesBtnText')

    expect(seeSchedulesButtonText.children[0]).toBe('See schedules')
  })

  it('should call navigate to AdminSchedules if "See Schedules" button is pressed', async () => {
    const { getByTestId } = render(<Boxdetail navigation={navigation} box={fakeBox}/>, { wrapper })

    const seeSchedulesButton = getByTestId('seeSchedulesBtn')
    fireEvent.press(seeSchedulesButton)

    expect(navigation.navigate).toHaveBeenCalledWith('AdminSchedules')
  })
})
