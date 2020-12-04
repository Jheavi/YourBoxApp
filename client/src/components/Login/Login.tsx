import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import images from '../../constants/images'

const image = { uri: images.homeScreen }

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

function Login ({ user }: any) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImage}
        source={image}
      />
      {!user &&
      <>
        <TouchableOpacity style={styles.buttonView}>
          <Text style={styles.buttonsText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonView}>
          <Text style={styles.buttonsText}>Login</Text>
        </TouchableOpacity>
      </>}
      {user &&
      <TouchableOpacity style={styles.buttonView}>
        <Text style={styles.buttonsText}>Logout</Text>
      </TouchableOpacity>
      }
    </View>
  )
}

export default Login
