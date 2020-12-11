import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { images } from '../../../constants/images'

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    backgroundColor: '#262626',
    width: 30,
    zIndex: 10
  }
})

function BurgerButton () {
  function onPress () {
    alert('You tapped the button!')
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.buttonContainer}
      hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
    >
      <Image source={images.logo} style={{ height: 40, width: 40, resizeMode: 'contain' }}/>
    </TouchableOpacity>
  )
}

export default BurgerButton
