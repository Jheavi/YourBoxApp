import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import FormModifyWorkout from './FormModifyWorkout'
import { fireEvent, render } from '@testing-library/react-native'
import { dateObject } from '../../../interfaces/interfaces'
import { extractDataFromDate } from '../../../utils/dateFunctions'
import { deleteWorkout, updateWorkout } from '../../../redux/actions/workoutActions'

jest.mock('../../../redux/actions/workoutActions')

const buildStore = configureStore([thunk])

describe('FormModifyWorkout', () => {
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
    todayDate = extractDataFromDate()
    setModalVisible = jest.fn()
  })

  it('renders correctly', () => {
    const initialState = {
      userReducer: { user: { ownerOfBox: {} } },
      workoutReducer: {}
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifyWorkout
      todayString={todayDate.dayString}
      setModalVisible={setModalVisible}
      />, { wrapper })

    const container = getByTestId('container')

    expect(container).toBeDefined()
  })

  it('should change the title', () => {
    const changedTitle = 'Changed Title'
    const initialState = {
      userReducer: { user: { ownerOfBox: {} } },
      workoutReducer: { workout: { title: 'aa' } }
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifyWorkout
      todayString={todayDate.dayString}
      setModalVisible={setModalVisible}
      />, { wrapper })

    const inputTitle = getByTestId('inputTitle')
    fireEvent.changeText(inputTitle, changedTitle)

    expect(inputTitle.props.value).toBe(changedTitle)
  })

  it('should change the type', () => {
    const changedType = 'AMRAP'
    const initialState = {
      userReducer: { user: { ownerOfBox: {} } },
      workoutReducer: { workout: { description: 'aa' } }
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifyWorkout
      todayString={todayDate.dayString}
      setModalVisible={setModalVisible}
      />, { wrapper })

    const typePicker = getByTestId('typePicker')
    fireEvent(typePicker, 'ValueChange', changedType, 0)
    const selectedIndex = typePicker.props.selected

    expect(typePicker.props.items[selectedIndex].value).toBe(changedType)
  })

  it('should change the description', () => {
    const changedDescription = 'Changed description'
    const initialState = {
      userReducer: { user: { ownerOfBox: {} } },
      workoutReducer: { workout: { description: 'aa' } }
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifyWorkout
      todayString={todayDate.dayString}
      setModalVisible={setModalVisible}
      />, { wrapper })

    const inputDescription = getByTestId('inputDescription')
    fireEvent.changeText(inputDescription, changedDescription)

    expect(inputDescription.props.value).toBe(changedDescription)
  })

  it('Save button should call updateWorkout', () => {
    const initialState = {
      userReducer: { user: { ownerOfBox: {} } },
      workoutReducer: { workout: { title: 'A', description: 'aa' } }
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifyWorkout
      todayString={todayDate.dayString}
      setModalVisible={setModalVisible}
      />, { wrapper })

    const saveButton = getByTestId('saveButton')
    fireEvent(saveButton, 'press')

    expect(updateWorkout).toHaveBeenCalled()
  })

  it('delete button should call deleteWorkout', () => {
    const initialState = {
      userReducer: { user: { ownerOfBox: {} } },
      workoutReducer: { workout: { title: 'A', description: 'aa' } }
    }
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<FormModifyWorkout
      todayString={todayDate.dayString}
      setModalVisible={setModalVisible}
      />, { wrapper })

    const deleteButton = getByTestId('deleteButton')
    fireEvent(deleteButton, 'press')

    expect(deleteWorkout).toHaveBeenCalled()
  })
})
