import * as AuthSession from 'expo-auth-session'
import { onLogout, toQueryString } from './authFunctions'

jest.mock('expo-auth-session')
// jest.mock('@unimodules/react-native-adapter', () => {})

describe('authFunctions', () => {
  const fakeResponse: AuthSession.AuthSessionResult = { type: 'dismiss' }

  test('toQueryString should return a string with the params joined', () => {
    const params = { param1: 'value1', param2: 'value2' }
    const response = toQueryString(params)

    expect(response).toBe('?param1=value1&param2=value2')
  })

  test('onLogout should call makeRedirectUri', async () => {
    await onLogout()

    expect(AuthSession.makeRedirectUri).toHaveBeenCalled()
  })

  test('onLogout should call startAsync', async () => {
    await onLogout()

    expect(AuthSession.startAsync).toHaveBeenCalled()
  })

  test('onLogout should return the object returned by startAsync', async () => {
    const spyStartAsync = jest.spyOn(AuthSession, 'startAsync').mockResolvedValueOnce(fakeResponse)

    const response = await onLogout()

    expect(response).toEqual(fakeResponse)
  })
})
