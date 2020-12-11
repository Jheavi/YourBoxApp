import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { images } from '../../../constants/images'
import { logout } from '../../../redux/actions/userActions'
import { connect } from 'react-redux'

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

function Logout ({ dispatch }: any) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImage}
        source={images.homeScreen}
      />
      <TouchableOpacity
        style={styles.buttonView}
        onPress={() => dispatch(logout())}
        testID="logoutBtn"
      >
        <Text style={styles.buttonsText} testID="logoutBtnText">Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default connect(null)(Logout)
