import React from 'react'
import { StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native'
import UserButton from './UserButton/UserButton'
import { useNavigation } from '@react-navigation/native'
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

function Header ({ user }: props) {
  const navigation = useNavigation()

  function navigate () {
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
        onPress={navigate}
        testID="navigateBtn"
      >
        <Text style={styles.title} testID="appName">YourBoxApp</Text>
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
