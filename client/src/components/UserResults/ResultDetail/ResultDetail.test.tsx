import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { loadWorkout } from '../../../redux/actions/workoutActions'
import { fireEvent, render } from '@testing-library/react-native'
import ResultDetail from './ResultDetail'
import { PastSession, workoutInterface } from '../../../interfaces/interfaces'

jest.mock('../FormModifyResult/FormModifyResult')
jest.mock('../../../redux/actions/workoutActions')

const buildStore = configureStore([thunk])

describe('ResultDetail', () => {
  let fakePastSession: PastSession
  let fakeWorkout: workoutInterface
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
    fakePastSession = {
      startHour: '09:00',
      finishHour: '10:00',
      type: 'WOD',
      day: '2020-09-22'
    }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render the session type correctly if pastSession type is "WOD"', () => {
    const initialState = { userReducer: { user: { affiliatedBox: {} } }, workoutReducer: {} }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<ResultDetail pastSession={fakePastSession}/>, { wrapper })

    const sessionType = getByTestId('sessionType')

    expect(sessionType.children[0]).toBe('WOD')
  })

  it('should render the session type correctly if pastSession type is not "WOD"', () => {
    fakePastSession = {
      startHour: '09:00',
      finishHour: '10:00',
      type: 'Open Box',
      day: '2020-09-22'
    }
    const initialState = { userReducer: { user: { affiliatedBox: {} } }, workoutReducer: {} }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<ResultDetail pastSession={fakePastSession}/>, { wrapper })

    const sessionType = getByTestId('sessionTypeNoWod')

    expect(sessionType.children[0]).toBe('Open Box')
  })

  it('should call loadWorkout action if workout touchable is pressed', () => {
    const initialState = { userReducer: { user: { affiliatedBox: {} } }, workoutReducer: {} }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<ResultDetail pastSession={fakePastSession}/>, { wrapper })

    const seeWorkoutBtn = getByTestId('seeWorkoutModalBtn')
    fireEvent.press(seeWorkoutBtn)

    expect(loadWorkout).toHaveBeenCalled()
  })

  it(`should not call loadWorkout action if workout touchable is pressed and 
  there is already a workout loaded with the same date as the session`, () => {
    fakeWorkout = {
      date: '2020-09-22',
      title: 'abc'
    }
    const initialState = {
      userReducer: { user: { affiliatedBox: {} } },
      workoutReducer: { workout: fakeWorkout }
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<ResultDetail pastSession={fakePastSession}/>, { wrapper })

    const seeWorkoutBtn = getByTestId('seeWorkoutModalBtn')
    fireEvent.press(seeWorkoutBtn)

    expect(loadWorkout).not.toHaveBeenCalled()
  })

  it('should change the workout modal to visible if workout touchable is pressed', () => {
    const initialState = { userReducer: { user: { affiliatedBox: {} } }, workoutReducer: {} }
    const wrapper = wrapperFactory(initialState)
    const { getAllByTestId } = render(<ResultDetail pastSession={fakePastSession}/>, { wrapper })

    const [seeWorkoutBtn, workoutModal] = getAllByTestId(/workoutmodal/i)
    fireEvent.press(seeWorkoutBtn)

    expect(workoutModal.props.visible).toBe(true)
  })

  it('should change the workout modal to no-visible if backDropPress', () => {
    const initialState = { userReducer: { user: { affiliatedBox: {} } }, workoutReducer: {} }
    const wrapper = wrapperFactory(initialState)
    const { getAllByTestId } = render(<ResultDetail pastSession={fakePastSession}/>, { wrapper })

    const [seeWorkoutBtn, workoutModal] = getAllByTestId(/workoutmodal/i)
    fireEvent.press(seeWorkoutBtn)
    fireEvent(workoutModal, 'backdropPress')

    expect(workoutModal.props.visible).toBe(false)
  })

  it('should load the activityIndicator if workout is loading', () => {
    const initialState = { userReducer: { user: { affiliatedBox: {} } }, workoutReducer: { workoutLoading: true } }
    const wrapper = wrapperFactory(initialState)
    const { getAllByTestId } = render(<ResultDetail pastSession={fakePastSession}/>, { wrapper })

    const [seeWorkoutBtn, , activityIndicator] = getAllByTestId(/workout/i)
    fireEvent.press(seeWorkoutBtn)

    expect(activityIndicator).toBeDefined()
  })

  it('should change the result modal to visible if result touchable is pressed', () => {
    const initialState = { userReducer: { user: { affiliatedBox: {} } }, workoutReducer: {} }
    const wrapper = wrapperFactory(initialState)
    const { getAllByTestId } = render(<ResultDetail pastSession={fakePastSession}/>, { wrapper })

    const [seeResultBtn, resultModal] = getAllByTestId(/resultmodal/i)
    fireEvent.press(seeResultBtn)

    expect(resultModal.props.visible).toBe(true)
  })

  it('should change the workout modal to no-visible if backDropPress', () => {
    const initialState = { userReducer: { user: { affiliatedBox: {} } }, workoutReducer: {} }
    const wrapper = wrapperFactory(initialState)
    const { getAllByTestId } = render(<ResultDetail pastSession={fakePastSession}/>, { wrapper })

    const [seeResultBtn, resultModal] = getAllByTestId(/resultmodal/i)
    fireEvent.press(seeResultBtn)
    fireEvent(resultModal, 'backdropPress')

    expect(resultModal.props.visible).toBe(false)
  })
})
