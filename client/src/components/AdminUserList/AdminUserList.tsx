import React, { useEffect } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { props, userInterface } from '../../interfaces/interfaces'
import { loadUsers } from '../../redux/actions/userActions'
import UserListDetail from './UserListDetail/UserListDetail'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    position: 'relative'
  },
  scrollContent: {
    flexGrow: 1,
    width,
    alignItems: 'center',
    marginBottom: 30,
    fontFamily: 'Roboto, Open Sans, sans-serif'
  },
  titleText: {
    fontSize: 28,
    color: 'white',
    marginVertical: 30
  }
})

function AdminUserList ({ dispatch, user, users }:props) {
  useEffect(() => {
    dispatch(loadUsers(user.ownerOfBox!._id))
  }, [])

  return (
    <View style={styles.container}>
    <Text style={styles.titleText} testID="usersTitle">Your Users</Text>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={true}
      >
        {users?.map((userListed: userInterface) => (
          <UserListDetail affiliatedUser={userListed} key={performance.now() * Math.random()}/>
        ))}
      </ScrollView>

    </View>
  )
}

function mapStateToProps ({ userReducer: { user, users } }: any) {
  return {
    user,
    users
  }
}

export default connect(mapStateToProps)(AdminUserList)
