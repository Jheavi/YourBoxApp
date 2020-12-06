import { makeRedirectUri, startAsync } from 'expo-auth-session'
import { Platform } from 'react-native'
import { StringMap } from '../interfaces/interfaces'
import auth0data from '../constants/auth0data'

export function toQueryString (params: StringMap) {
  const paramsJoined: string = Object.entries(params).map(([key, value]) =>
      `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  ).join('&')
  return `?${paramsJoined}`
};

export async function onLogin () {
  const useProxy = Platform.select({ web: false, default: true })
  const redirectUri = makeRedirectUri({ native: auth0data.redirectUri, useProxy })

  const params = {
    client_id: auth0data.clientId,
    redirect_uri: redirectUri,
    response_type: 'token id_token',
    nonce: 'nonce',
    prompt: 'select_account'
  }

  const queryParams = toQueryString(params)

  const authUrl = `https://${auth0data.domain}/authorize${queryParams}`

  const response = await startAsync({ authUrl, showInRecents: true })
  return response
}

export async function onLogout () {
  const useProxy = Platform.select({ web: false, default: true })
  const redirectUri = makeRedirectUri({ native: auth0data.logoutUri, useProxy })

  const params = {
    client_id: auth0data.clientId,
    returnTo: redirectUri
  }

  const queryParams = toQueryString(params)

  const authUrl = `https://${auth0data.domain}/v2/logout${queryParams}&federated`

  const response = await startAsync({ authUrl })
  return response
}
