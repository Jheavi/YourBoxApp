import React from 'react'
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, Image } from 'react-native'
import BurgerButton from './BurgerButton/BurgerButton'
import UserButton from './UserButton/UserButton'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { props } from '../../interfaces/interfaces'
import { images } from '../../constants/images'

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
  titleTouchable: {
    flex: 1,
    flexDirection: 'row',
    minWidth: '60%',
    justifyContent: 'center',
    maxHeight: 60
  },
  title: {
    color: 'white',
    fontSize: 34,
    textAlign: 'center'
  }
})

function Header ({ user }: props) {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      <View style={{ flex: 2 }} />
      <BurgerButton />
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={styles.titleTouchable}
        onPress={() => {
          !user
            ? navigation.navigate('Login')
            : user.admin
              ? navigation.navigate('Home')
              : navigation.navigate('UserHome')
        }}
      >
        <Text style={styles.title}>YourBoxApp</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }} />
      {user && <UserButton />}
      <View style={{ flex: 2 }} />
    </View>
  )
}

function mapStateToProps ({ userReducer }: any) {
  return {
    user: userReducer.user
  }
}

export default connect(mapStateToProps)(Header)
