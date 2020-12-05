import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import images from '../../constants/images'
import jwtDecode from 'jwt-decode'
import { onLogin } from '../../utils/authFunctions'
import { maybeCompleteAuthSession } from 'expo-web-browser'

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

maybeCompleteAuthSession()

function Login ({ user }: any) {
  async function loginBtn () {
    const response = await onLogin()
    console.log(response)

    if (response.type === 'success') {
      const decodedJwtIdToken = jwtDecode(response.params.id_token)
      console.log(decodedJwtIdToken)
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImage}
        source={images.homeScreen}
      />
      {!user &&
      <>
        <TouchableOpacity
          style={styles.buttonView}
          onPress={() => loginBtn()}
        >
          <Text style={styles.buttonsText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonView}>
          <Text style={styles.buttonsText}>Login</Text>
        </TouchableOpacity>
      </>}
      {user &&
      <TouchableOpacity
        style={styles.buttonView}
      >
        <Text style={styles.buttonsText}>Logout</Text>
      </TouchableOpacity>
      }
    </View>
  )
}

export default Login
