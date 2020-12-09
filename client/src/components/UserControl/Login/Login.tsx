import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Platform, Alert, ScrollView, Dimensions } from 'react-native'
import images from '../../../constants/images'
import { login } from '../../../redux/actions/userActions'
import { connect } from 'react-redux'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import auth0data from '../../../constants/auth0data'
import { props } from '../../../interfaces/interfaces'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#0d0d0d',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    width
  },
  scrollContent: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#0d0d0d',
    width: '100%'
  },
  loginButton: {
    backgroundColor: '#cb1313',
    padding: 10,
    marginVertical: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 130,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8
  },
  buttonsText: {
    color: 'white',
    fontSize: 30
  },
  secondaryTitles: {
    color: 'white',
    fontSize: 25,
    marginLeft: 30,
    marginBottom: 15
  },
  backImage: {
    position: 'absolute',
    top: 0,
    marginVertical: 'auto',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.4
  },
  gymView: {
    zIndex: 10,
    flex: 1,
    maxHeight: 200,
    width: '100%',
    position: 'relative'
  },
  triangleShape: {
    zIndex: 10,
    position: 'absolute',
    width: 0,
    height: 0,
    right: 0,
    bottom: 0,
    borderLeftWidth: 220,
    borderBottomWidth: 60,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#000000'
  },
  gymBackImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  schedulesButton: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 100,
    position: 'absolute',
    fontSize: 20,
    bottom: 20,
    width: '50%',
    marginLeft: 15,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  schedulesButtonText: {
    color: 'white',
    fontSize: 24
  }
})

function Login ({ dispatch, navigation }: props) {
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
      <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.scrollContent}>
        {/* <ImageBackground
          style={styles.backImage}
          source={images.homeScreen}
        /> */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => promptAsync({ useProxy })}
        >
          <Text style={styles.buttonsText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.secondaryTitles}>See gyms around you</Text>
        <View style={styles.gymView}>
          <ImageBackground
            style={styles.gymBackImage}
            source={images.gym1}
          />
          <View style={styles.triangleShape}/>
          <TouchableOpacity
            style={styles.schedulesButton}
            activeOpacity={0.4}
            onPress={() => navigation.navigate('AdminSchedules')}
          >
            <Text style={styles.schedulesButtonText}>See schedules</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default connect(null)(Login)
