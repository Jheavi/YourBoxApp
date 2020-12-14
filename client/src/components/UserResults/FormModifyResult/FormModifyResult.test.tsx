import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { loadWorkout } from '../../../redux/actions/workoutActions'
import { updateResult } from '../../../redux/actions/userActions'
import { fireEvent, render } from '@testing-library/react-native'
import FormModifyResult from './FormModifyResult'
import { PastSession, workoutInterface } from '../../../interfaces/interfaces'

jest.mock('../../../redux/actions/workoutActions')
jest.mock('../../../redux/actions/userActions')

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
    fakeWorkout = {
      date: '2020-09-22',
      type: 'For Time'
    }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should call loadWorkout if not workout loaded and no resultWorkout in props', () => {
    const initialState = {
      userReducer: { user: { affiliatedBox: {} } },
      workoutReducer: {}
    }
    const wrapper = wrapperFactory(initialState)
    render(<FormModifyResult pastSession={fakePastSession}/>, { wrapper })

    expect(loadWorkout).toHaveBeenCalled()
  })

  it('should not call loadWorkout if no resultWorkout in props but there is a workout loaded', () => {
    const initialState = {
      userReducer: { user: { affiliatedBox: {} } },
      workoutReducer: { workout: fakeWorkout }
    }
    const wrapper = wrapperFactory(initialState)
    render(<FormModifyResult pastSession={fakePastSession}/>, { wrapper })

    expect(loadWorkout).not.toHaveBeenCalled()
  })

  it('should render the result title correctly if workout type is "For Time"', () => {
    const initialState = {
      userReducer: { user: { affiliatedBox: {} } },
      workoutReducer: {}
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifyResult
      pastSession={fakePastSession}
      resultWorkout={fakeWorkout}
    />, { wrapper })

    const resultTitle = getByTestId('resultTitle')

    expect(resultTitle.children[0]).toBe('Time:')
  })

  it('should render the result title correctly if workout type is "AMRAP"', () => {
    fakeWorkout = {
      date: '2020-09-22',
      type: 'AMRAP'
    }
    const initialState = {
      userReducer: { user: { affiliatedBox: {} } },
      workoutReducer: {}
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifyResult
      pastSession={fakePastSession}
      resultWorkout={fakeWorkout}
    />, { wrapper })

    const resultTitle = getByTestId('resultTitle')

    expect(resultTitle.children[0]).toBe('Reps:')
  })

  it('should render the result title correctly if workout type is "EMOM"', () => {
    fakeWorkout = {
      date: '2020-09-22',
      type: 'EMOM'
    }
    const initialState = {
      userReducer: { user: { affiliatedBox: {} } },
      workoutReducer: {}
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifyResult
      pastSession={fakePastSession}
      resultWorkout={fakeWorkout}
    />, { wrapper })

    const resultTitle = getByTestId('resultTitle')

    expect(resultTitle.children[0]).toBe('Minutes completed:')
  })

  it('should call updateResult if save button is pressed', () => {
    const initialState = {
      userReducer: { user: { affiliatedBox: {} } },
      workoutReducer: {}
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifyResult pastSession={fakePastSession}/>, { wrapper })

    const saveButton = getByTestId('saveButton')
    fireEvent.press(saveButton)

    expect(updateResult).toHaveBeenCalled()
  })

  it('should change the result', () => {
    const changedResult = '123'
    const initialState = {
      userReducer: { user: { affiliatedBox: {} } },
      workoutReducer: {}
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifyResult pastSession={fakePastSession}/>, { wrapper })

    const inputResult = getByTestId('inputResult')
    fireEvent.changeText(inputResult, changedResult)

    expect(inputResult.props.value).toBe(changedResult)
  })
})
