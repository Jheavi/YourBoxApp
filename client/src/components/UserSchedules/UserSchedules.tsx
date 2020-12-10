import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { Calendar, CalendarTheme, DateObject } from 'react-native-calendars'
import { connect } from 'react-redux'
import { props } from '../../interfaces/interfaces'
import { isSchedulesLoading, loadSchedule } from '../../redux/actions/schedulesActions'
import { extractDataFromDate } from '../../utils/dateFunctions'
import UserDaySchedule from './UserDaySchedule/UserDaySchedule'

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    justifyContent: 'center',
    alignItems: 'center',
    height
  },
  dayText: {
    color: 'white',
    marginTop: 20,
    fontSize: 20
  },
  scrollContent: {
    alignItems: 'center',
    width: '100%'
  },
  scheduleView: {
    flex: 1,
    marginBottom: 20
  }
})

const calendarTheme: CalendarTheme = {
  textSectionTitleColor: '#cb1313',
  calendarBackground: 'white',
  textDisabledColor: '#bbbbbb',
  todayTextColor: '#cb1313',
  arrowColor: 'white',
  dayTextColor: 'black',
  textMonthFontSize: 22,
  monthTextColor: 'white',
  'stylesheet.calendar.header': {
    header: {
      backgroundColor: '#cb1313',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      alignItems: 'center'
    }
  },
  'stylesheet.calendar.main': {
    container: {
      padding: 0,
      backgroundColor: '#ffffff'
    }
  }
}

function UserSchedules ({ dispatch, schedule, schedulesLoading, user }: props) {
  const { dayString } = extractDataFromDate()
  const [displayedDay, setDisplayedDay] = useState(dayString)
  const [formattedDate, setFormattedDate] = useState(extractDataFromDate(displayedDay).formattedDate)

  useEffect(() => {
    dispatch(loadSchedule(dayString, user.affiliatedBox!._id))
    dispatch(isSchedulesLoading())
  }, [])

  useEffect(() => {
    setFormattedDate(extractDataFromDate(displayedDay).formattedDate)
  }, [displayedDay])

  function onDayPress ({ dateString }: DateObject) {
    setDisplayedDay(dateString)
    dispatch(isSchedulesLoading())
    dispatch(loadSchedule(dateString, user.affiliatedBox!._id))
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={true}
      >
        <Calendar
              style={{ marginTop: 20 }}
              theme={calendarTheme}
              firstDay={1}
              onDayPress={onDayPress}
            />
        <Text style={styles.dayText} testID="scheduleDate">{formattedDate}</Text>
      <View style={styles.scheduleView}>
        {schedulesLoading &&
        <View style={{ height: '100%' }}>
          <ActivityIndicator size="large" color="#cb1313" testID="scheduleActivity"/>
        </View>
        }
        {!schedulesLoading && schedule &&
          <UserDaySchedule weekDay={schedule} day={displayedDay}/>
        }
      </View>
      </ScrollView>
    </View>
  )
}

function mapStateToProps ({ schedulesReducer, userReducer }: any) {
  return {
    schedule: schedulesReducer.schedule,
    schedulesLoading: schedulesReducer.schedulesLoading,
    user: userReducer.user
  }
}

export default connect(mapStateToProps)(UserSchedules)
