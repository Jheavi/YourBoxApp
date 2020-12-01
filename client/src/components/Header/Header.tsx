import React from 'react'
import { StyleSheet, View, Text, StatusBar, TouchableWithoutFeedback } from 'react-native'
import BurgerButton from './BurgerButton/BurgerButton'
import UserButton from './UserButton/UserButton'
import { useNavigation } from '@react-navigation/native'
// import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
    fontFamily: 'Roboto, Open Sans, sans-serif',
    backgroundColor: '#262626',
    height: 80,
    position: 'relative'
  },

  title: {
    color: 'white',
    fontSize: 35,
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    textAlign: 'center'
  }
})

function Header () {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      <View style={{ flex: 1 }} />
      <BurgerButton />
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => { navigation.navigate('Home') }}
      >
        <Text style={styles.title}>GymApp</Text>
      </TouchableWithoutFeedback>
      <View style={{ flex: 8 }} />
      <UserButton />
      <View style={{ flex: 1 }} />
    </View>
  )
}

export default Header
