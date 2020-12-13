import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { dayScheduleProps, SessionInterface } from '../../../interfaces/interfaces'
import UserSessionItem from '../UserSessionItem/UserSessionItem'
import { connect } from 'react-redux'
import { extractDataFromDate } from '../../../utils/dateFunctions'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  dayView: {
    flex: 1,
    width: width - 10,
    marginHorizontal: 5,
    position: 'relative'
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#0d0d0d'
  },
  dayText: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
    marginBottom: 20,
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  noScheduleText: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 70,
    lineHeight: 40
  },
  createButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#cb1313',
    minWidth: 40,
    minHeight: 40,
    borderRadius: 4,
    elevation: 5,
    zIndex: 100
  },
  createButtonText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function UserDaySchedule ({ day, user, weekDay }: dayScheduleProps) {
  const [userCanBook, setUserCanBook] = useState(false)

  useEffect(() => {
    if (!user!.active) {
      setUserCanBook(false)
    } else {
      const pastSessionsThisMonth = user!.pastSessions.filter((session) => extractDataFromDate(session.day).month === extractDataFromDate().month).length
      const reservedSessionsThisMonth = user!.reservedSessions.filter((session) => extractDataFromDate(session.day).month === extractDataFromDate().month).length
      setUserCanBook(typeof user!.affiliatedProgram === 'object' && user!.affiliatedProgram.sessionsPerMonth - pastSessionsThisMonth - reservedSessionsThisMonth > 0)
    }
  }, [user])

  return (
    <View style={styles.dayView}>
      <Text style={styles.dayText} testID={'dayScheduleTitle'}>{weekDay.day}</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {weekDay && (!weekDay.sessions.length
          ? <Text style={styles.noScheduleText} testID="noScheduleText">There is no schedule for this day</Text>
          : (weekDay.sessions.map((session: SessionInterface) => {
              return <UserSessionItem day={day} session={session} userCanBook={userCanBook} key={performance.now() * Math.random()} />
            })
            ))
          }
      </ScrollView>
    </View>
  )
}

function mapStateToProps ({ userReducer }: any) {
  return {
    user: userReducer.user
  }
}

export default connect(mapStateToProps)(UserDaySchedule)
