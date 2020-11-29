import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import BurgerButton from './BurgerButton/BurgerButton'
import UserButton from './UserButton/UserButton'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 20,
    fontFamily: 'Roboto, Open Sans, sans-serif',
    backgroundColor: '#262626',
    height: 90,
    position: 'relative'
  },

  title: {
    color: 'white',
    fontSize: 35,
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    textAlign: 'center'
  }
})

function Header () {
  return (
  <View style={styles.container}>
    <View style={{ flex: 1 }} />
    <BurgerButton />
    <Text style={styles.title}>GymApp</Text>
    <View style={{ flex: 8 }} />
    <UserButton />
    <View style={{ flex: 1 }} />
  </View>
  )
}

export default Header
