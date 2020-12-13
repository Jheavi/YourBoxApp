import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'

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

function userButton () {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('UserProfile')}
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

export default connect(null)(userButton)
