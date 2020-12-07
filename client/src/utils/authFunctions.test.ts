import { toQueryString, onLogin } from './authFunctions'
import * as AuthSession from 'expo-auth-session'
import { Platform } from 'react-native'

jest.mock('react-native')
jest.mock('expo-auth-session')
// jest.mock('@unimodules/react-native-adapter', () => {})

describe('authFunctions', () => {
  test('toQueryString should return a string with the params joined', () => {
    const params = { param1: 'value1', param2: 'value2' }
    const response = toQueryString(params)

    expect(response).toBe('?param1=value1&param2=value2')
  })

  test('onLogin should call Platform.select', async () => {
    const fakeResponse = { type: 'cancel' }
    Platform.select = jest.fn()
    const spyMakeRedirectUri = jest.spyOn(AuthSession, 'makeRedirectUri').mockReturnValueOnce('url')
    const spyStartAsync = jest.spyOn(AuthSession, 'startAsync').mockResolvedValueOnce(fakeResponse)
    const response = await onLogin()

    expect(response).toEqual(fakeResponse)
  })
})
