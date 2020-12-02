/* eslint-disable react/prop-types */
import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import FormModifyWorkout from './FormModifyWorkout'
import { fireEvent, render } from '@testing-library/react-native'
// Note: test renderer must be required after react-native.
import { dateObject } from '../../../interfaces/interfaces'
import { extractDataFromTodayDate } from '../../../utils/dateFunctions'
import { updateWorkout } from '../../../redux/actions/workoutActions'

jest.mock('../../../redux/actions/workoutActions')

const buildStore = configureStore([thunk])

describe('Workout', () => {
  let todayDate: dateObject
  let setModalVisible: Function

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
    todayDate = extractDataFromTodayDate()
    setModalVisible = jest.fn()
  })

  it('renders correctly', () => {
    const initialState = { workoutReducer: {} }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifyWorkout
      todayString={todayDate.todayString}
      setModalVisible={setModalVisible}
      />, { wrapper })

    const picker = getByTestId('picker')

    expect(picker.props.items.length).toBe(3)
  })

  it('should change the title', () => {
    const changedTitle = 'Changed Title'
    const initialState = { workoutReducer: { workout: { title: 'aa' } } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifyWorkout
      todayString={todayDate.todayString}
      setModalVisible={setModalVisible}
      />, { wrapper })

    const inputTitle = getByTestId('inputTitle')
    fireEvent.changeText(inputTitle, changedTitle)

    expect(inputTitle.props.value).toBe(changedTitle)
  })

  it('should change the description', () => {
    const changedDescription = 'Changed description'
    const initialState = { workoutReducer: { workout: { description: 'aa' } } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifyWorkout
      todayString={todayDate.todayString}
      setModalVisible={setModalVisible}
      />, { wrapper })

    const inputDescription = getByTestId('inputDescription')
    fireEvent.changeText(inputDescription, changedDescription)

    expect(inputDescription.props.value).toBe(changedDescription)
  })

  it('Save button should call updateWorkout', () => {
    const initialState = { workoutReducer: { workout: { description: 'aa' } } }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifyWorkout
      todayString={todayDate.todayString}
      setModalVisible={setModalVisible}
      />, { wrapper })

    const saveButton = getByTestId('saveButton')
    fireEvent(saveButton, 'press')

    expect(updateWorkout).toHaveBeenCalled()
  })
})
