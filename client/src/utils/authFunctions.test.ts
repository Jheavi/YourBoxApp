import { toQueryString } from './authFunctions'

jest.mock('react-native')
jest.mock('expo-auth-session')
// jest.mock('@unimodules/react-native-adapter', () => {})

describe('authFunctions', () => {
  test('toQueryString should return a string with the params joined', () => {
    const params = { param1: 'value1', param2: 'value2' }
    const response = toQueryString(params)

    expect(response).toBe('?param1=value1&param2=value2')
  })
})
