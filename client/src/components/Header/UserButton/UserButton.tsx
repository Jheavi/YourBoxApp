import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { props } from '../../../interfaces/interfaces'

const styles = StyleSheet.create({
  userButton: {
    display: 'flex',
    alignItems: 'center',
    height: 30,
    width: 30,
    borderRadius: 60,
    borderColor: 'white',
    borderWidth: 1,
    overflow: 'hidden',
    zIndex: 10
  }
})

function userButton ({ navigation }: props) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('UserProfile')}
      style={styles.userButton}
      hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
      testID="userButton"
    >
      <Icon
        name="user"
        size={30}
        color="white"
      />
    </TouchableOpacity>
  )
}

export default connect(null)(userButton)
