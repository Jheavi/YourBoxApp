import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { props } from '../../../interfaces/interfaces'
import { addReservedSession, removeReservedSession } from '../../../redux/actions/userActions'
import { extractDataFromDate } from '../../../utils/dateFunctions'

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
    fontSize: 19,
    marginLeft: 15
  },
  enrollButton: {
    backgroundColor: '#218520',
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    width: 80,
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

function UserSessionItem ({ day, dispatch, session, user, userCanBook }: props) {
  const actualDay = extractDataFromDate()

  function checkIfSessionHasPassed (): boolean {
    return actualDay.dayString > day
      ? true
      : actualDay.dayString < day
        ? false
        : +actualDay.hour.split(':')[0] + 2 > +session.startHour.split(':')[0]
  }

  const [sessionHasPassed] = useState(checkIfSessionHasPassed())

  function checkIfUserHasSession (): boolean {
    return user.reservedSessions.some((reservedSession) => (
      reservedSession.day === day &&
      reservedSession.startHour === session.startHour &&
      reservedSession.finishHour === session.finishHour &&
      reservedSession.type === session.type
    )) || user.pastSessions.some((pastSession) => (
      pastSession.day === day &&
      pastSession.startHour === session.startHour &&
      pastSession.finishHour === session.finishHour &&
      pastSession.type === session.type
    ))
  }

  const [userHasSession, setUserHasSession] = useState(checkIfUserHasSession())

  useEffect(() => {
    setUserHasSession(checkIfUserHasSession())
  }, [user])

  function OnEnrollPress (): void {
    dispatch(addReservedSession({ ...session, day }, user))
  }

  function OnCancelPress (): void {
    dispatch(removeReservedSession({ ...session, day }, user))
  }

  return (
    <View style={{
      ...styles.sessionView,
      backgroundColor:
      userHasSession
        ? '#94b8da'
        : session.type === 'WOD'
          ? '#014aa5'
          : session.type === 'Open Box'
            ? '#016500'
            : '#a20000',
      opacity: !sessionHasPassed ? 1 : 0.5
    }}
    testID="sessionContainer"
    >
      <View style={{ flex: 1 }}/>
      <Text style={styles.sessionText} testID="hourText">{`${session.startHour} - ${session.finishHour}`}</Text>
      <View style={{ flex: 2 }}/>
      <Text style={styles.sessionText}>{session.type}</Text>
      <View style={{ flex: 2 }}/>
      {!userHasSession &&
        <TouchableOpacity
          style={{ ...styles.enrollButton, opacity: userCanBook ? 1 : 0.5 }}
          onPress={OnEnrollPress}
          testID="enrollBtn"
          disabled={!userCanBook || sessionHasPassed}
        >
          <Text style={styles.enrollButtonText}>Enroll</Text>
        </TouchableOpacity>
      }
      {userHasSession &&
        <TouchableOpacity
          style={{ ...styles.enrollButton, backgroundColor: '#cb1313' }}
          onPress={OnCancelPress}
          testID="cancelBtn"
          disabled={sessionHasPassed}
        >
          <Text style={styles.enrollButtonText}>Cancel</Text>
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
