import React from 'react'
import { StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native'
import UserButton from './UserButton/UserButton'
import { connect } from 'react-redux'
import { props } from '../../interfaces/interfaces'
import { Image } from 'react-native-elements'
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
  },
  logo: {
    height: 40,
    width: 40,
    resizeMode: 'contain'
  }
})

function Header ({ navigation, user }: props) {
  function navigateTo () {
    !user
      ? navigation.navigate('Login')
      : user.admin
        ? navigation.navigate('Home')
        : navigation.navigate('UserHome')
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      <View style={{ flex: 2 }} />
      <Image source={images.logo} style={styles.logo}/>
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={styles.titleTouchable}
        onPress={navigateTo}
        testID="navigateBtn"
      >
        <Text style={styles.title} testID="appName">YourBoxApp</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }} />
      {user ? <UserButton navigation={navigation}/> : <View style={{ height: 30, width: 30 }}/>}
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
