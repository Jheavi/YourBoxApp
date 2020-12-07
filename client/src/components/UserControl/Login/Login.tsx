import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Platform, Alert } from 'react-native'
import images from '../../../constants/images'
import { login } from '../../../redux/actions/userActions'
import { connect } from 'react-redux'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import auth0data from '../../../constants/auth0data'
import { props } from '../../../interfaces/interfaces'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#0d0d0d',
    flex: 1,
    justifyContent: 'center',
    position: 'relative'
  },
  buttonView: {
    backgroundColor: '#cb1313',
    padding: 10,
    margin: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8
  },
  buttonsText: {
    color: 'white',
    fontSize: 30
  },
  backImage: {
    position: 'absolute',
    top: 0,
    marginVertical: 'auto',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.4
  }
})

function Login ({ dispatch }: props) {
  const useProxy = Platform.select({ web: false, default: true })
  const redirectUri = makeRedirectUri({ useProxy })

  const [, result, promptAsync] = useAuthRequest(
    {
      redirectUri,
      clientId: auth0data.clientId,
      responseType: 'id_token',
      scopes: ['openid', 'profile', 'email'],
      extraParams: {
        nonce: 'nonce'
      }
    },
    { authorizationEndpoint: `https://${auth0data.domain}/authorize` }
  )

  useEffect(() => {
    if (result) {
      if (result.type === 'error') {
        Alert.alert(
          'Authentication error',
          result.params.error_description || 'something went wrong'
        )
        return
      }
      if (result.type === 'success') {
        dispatch(login(result.params.id_token))
      }
    }
  }, [result])

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImage}
        source={images.homeScreen}
      />
      <TouchableOpacity
        style={styles.buttonView}
        onPress={() => promptAsync({ useProxy })}
      >
        <Text style={styles.buttonsText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default connect(null)(Login)
