import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import AdminHome from './AdminHome'

jest.mock('@react-navigation/native')

const buildStore = configureStore([thunk])

describe('AdminHome', () => {
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
    navigation = {
      navigate: jest.fn()
    }
  })

  it('renders correctly', () => {
    const initialState = { }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<AdminHome navigation={navigation}/>, { wrapper })

    const workoutButton = getByTestId('workoutTextBtn')

    expect(workoutButton.children[0]).toBe('Your workouts')
  })

  it('should call navigation.navigate with argument "AdminWorkout" with "Your workouts" button', () => {
    const initialState = { workoutReducer: {} }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<AdminHome navigation={navigation}/>, { wrapper })

    const workoutButton = getByTestId('workoutBtn')
    fireEvent.press(workoutButton)

    expect(navigation.navigate).toHaveBeenCalledWith('AdminWorkout')
  })

  it('should call navigation.navigate with argument "AdminSchedules" with "Your schedules" button', () => {
    const initialState = { workoutReducer: {} }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<AdminHome navigation={navigation}/>, { wrapper })

    const schedulesButton = getByTestId('schedulesBtn')
    fireEvent.press(schedulesButton)

    expect(navigation.navigate).toHaveBeenCalledWith('AdminSchedules')
  })

  it('should call navigation.navigate with argument "AdminPrograms" with "Your programs" button', () => {
    const initialState = { workoutReducer: {} }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<AdminHome navigation={navigation}/>, { wrapper })

    const programsButton = getByTestId('programsBtn')
    fireEvent.press(programsButton)

    expect(navigation.navigate).toHaveBeenCalledWith('AdminPrograms')
  })

  it('should call navigation.navigate with argument "AdminUsers" with "Your users" button', () => {
    const initialState = { workoutReducer: {} }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<AdminHome navigation={navigation}/>, { wrapper })

    const usersButton = getByTestId('usersBtn')
    fireEvent.press(usersButton)

    expect(navigation.navigate).toHaveBeenCalledWith('AdminUsers')
  })
})
