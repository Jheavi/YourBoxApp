import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'

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
      <Icon
        name="bars"
        size={30}
        color="white"
      />
    </TouchableOpacity>
  )
}

export default BurgerButton
