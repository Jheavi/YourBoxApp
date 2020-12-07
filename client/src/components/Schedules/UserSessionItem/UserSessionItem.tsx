import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { props } from '../../../interfaces/interfaces'
import { addOrRemoveReservedSession } from '../../../redux/actions/userActions'

const styles = StyleSheet.create({
  sessionView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 70,
    maxHeight: 70,
    marginVertical: 5,
    borderRadius: 25,
    paddingHorizontal: 8
  },
  sessionText: {
    color: 'white',
    width: 150,
    textAlign: 'center',
    fontSize: 19
  },
  enrollButton: {
    backgroundColor: '#14680c',
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    elevation: 8
  },
  enrollButtonText: {
    color: 'white',
    fontSize: 18
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function UserSessionItem ({ day, dispatch, session, user }: props) {
  function OnEnrollPress () {
    dispatch(addOrRemoveReservedSession({ ...session, day }, user))
  }

  return (
    <View style={{
      ...styles.sessionView,
      backgroundColor:
      session!.type === 'WOD'
        ? '#014aa5'
        : session!.type === 'Open Box'
          ? '#016500'
          : '#a20000'
    }} >
      <View style={{ flex: 1 }}/>
      <Text style={styles.sessionText} testID="hourText">{`${session!.startHour} - ${session!.finishHour}`}</Text>
      <View style={{ flex: 2 }}/>
      <Text style={styles.sessionText} testID="typeText">{session!.type}</Text>
      <View style={{ flex: 2 }}/>
      {user && !user.admin &&
        <TouchableOpacity
          style={styles.enrollButton}
          onPress={OnEnrollPress}
          testID="enrollBtn"
        >
          <Text style={styles.enrollButtonText}>Enroll</Text>
        </TouchableOpacity>
      }
    </View>
  )
}

function mapStateToProps ({ userReducer }: any) {
  return {
    user: userReducer.user
  }
}

export default connect(mapStateToProps)(UserSessionItem)
