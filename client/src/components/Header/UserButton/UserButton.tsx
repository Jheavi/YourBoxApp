import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  userButton: {
    display: 'flex',
    alignItems: 'center',
    height: 30,
    width: 30,
    borderRadius: 60,
    borderColor: '#ffffff',
    borderWidth: 1,
    overflow: 'hidden',
    zIndex: 10
  }
})

function userButton () {
  function onPress () {
    alert('You tapped the button!')
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.userButton}
      hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
    >
      <Icon
        name="user"
        size={30}
        color="white"
      />
    </TouchableOpacity>
  )
}

export default userButton
