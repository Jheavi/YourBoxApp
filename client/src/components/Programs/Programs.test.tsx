import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { fireEvent, render } from '@testing-library/react-native'
import { loadPrograms } from '../../redux/actions/programActions'
import Programs from './Programs'

jest.mock('../../redux/actions/programActions')
jest.mock('./ProgramDetail/ProgramDetail')
jest.mock('./FormModifyProgram/FormModifyProgram')

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
    initialState = {
      programReducer: { programs: [] },
      userReducer: { user: { ownerOfBox: {} } }
    }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders correctly', () => {
    const wrapper = wrapperFactory(initialState)
    const { getByTestId } = render(<Programs />, { wrapper })

    const title = getByTestId('programsTitle')

    expect(title.children[0]).toBe('Your programs')
  })

  it('should call loadPrograms', () => {
    const wrapper = wrapperFactory(initialState)
    render(<Programs />, { wrapper })
    expect(loadPrograms).toHaveBeenCalled()
  })

  it('should set modal to visible if create button is touched', () => {
    const wrapper = wrapperFactory(initialState)
    const { getAllByTestId } = render(<Programs />, { wrapper })

    const [touchableModal, modal] = getAllByTestId(/Modal/)

    fireEvent.press(touchableModal)

    expect(modal.props.visible).toBe(true)
  })

  it('should change the modal to no-visible if backDropPress', () => {
    const wrapper = wrapperFactory(initialState)
    const { getAllByTestId } = render(<Programs />, { wrapper })

    const [touchableModal, modal] = getAllByTestId(/Modal/)

    fireEvent.press(touchableModal)
    fireEvent(modal, 'backdropPress')

    expect(modal.props.visible).toBe(false)
  })

  it('should render three ProgramDetail components with a programs array with length 3', () => {
    initialState = {
      programReducer: {
        programs: [
          { name: 'a' },
          { name: 'a' },
          { name: 'a' }
        ]
      },
      userReducer: { user: { ownerOfBox: {} } }
    }
    const wrapper = wrapperFactory(initialState)
    const { getAllByText } = render(<Programs />, { wrapper })

    const programDetailComponents = getAllByText(/MockedProgramDetailItem/)

    expect(programDetailComponents.length).toBe(3)
  })
})
