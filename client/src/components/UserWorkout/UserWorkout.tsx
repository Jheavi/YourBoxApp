import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Calendar, CalendarTheme, DateObject } from 'react-native-calendars'
import { connect } from 'react-redux'
import { images } from '../../constants/images'
import { props } from '../../interfaces/interfaces'
import { isWorkoutLoading, loadWorkout } from '../../redux/actions/workoutActions'
import { extractDataFromDate } from '../../utils/dateFunctions'

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    justifyContent: 'center',
    alignItems: 'center',
    height
  },
  scrollContent: {
    alignItems: 'center',
    width: '100%'
  },
  square: {
    maxWidth: '80%',
    minWidth: '80%',
    minHeight: '30%',
    borderColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    borderWidth: 2,
    height: 'auto',
    marginTop: 10,
    marginBottom: 30,
    position: 'relative'
  },
  workoutView: {
    justifyContent: 'center',
    height: 'auto',
    flexDirection: 'row',
    width: '100%'
  },
  workoutTextView: {
    flexDirection: 'column',
    marginHorizontal: 20
  },
  workoutTitle: {
    color: 'white',
    fontSize: 30,
    paddingTop: 20,
    textTransform: 'uppercase'
  },
  workoutType: {
    width: 'auto',
    color: '#ffffff',
    textAlign: 'left',
    paddingTop: 20,
    paddingBottom: 2,
    marginBottom: 10,
    fontSize: 24
  },
  workoutText: {
    color: 'white',
    textAlign: 'left',
    paddingBottom: 30,
    paddingTop: 5,
    fontSize: 19
  },
  image: {
    resizeMode: 'cover',
    opacity: 0.4,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    marginBottom: 'auto',
    marginTop: 'auto'
  },
  dayText: {
    color: 'white',
    marginTop: 20,
    fontSize: 20
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

function UserWorkout ({ dispatch, user, workoutLoading, workout }: props) {
  const { dayString } = extractDataFromDate()
  const [displayedDay, setDisplayedDay] = useState(dayString)
  const [formattedDate, setFormattedDate] = useState(extractDataFromDate(displayedDay).formattedDate)
  const noWorkout = 'There is no workout for the selected day'
  const scrollRef = useRef<ScrollView>(null)

  useEffect(() => {
    dispatch(loadWorkout(dayString, user.affiliatedBox!._id))
    dispatch(isWorkoutLoading())
  }, [])

  useEffect(() => {
    if (workout) {
      setDisplayedDay(workout.date)
    }
  }, [workout])

  useEffect(() => {
    setFormattedDate(extractDataFromDate(displayedDay).formattedDate)
  }, [displayedDay])

  function scrollToStart () {
    scrollRef.current!.scrollTo({
      x: 0,
      y: 0,
      animated: true
    })
  }

  function onDayPress (day: DateObject) {
    dispatch(isWorkoutLoading())
    dispatch(loadWorkout(day.dateString, user.affiliatedBox!._id))
    setDisplayedDay(day.dateString)
    scrollToStart()
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={true}
        ref={scrollRef}
      >
      <Text style={styles.dayText} testID="workoutDate">{formattedDate}</Text>
        <View style={styles.square}>
          <ImageBackground source={images.workoutbackground} style={styles.image} />
          {workoutLoading &&
          <View style={styles.workoutView}>
            <ActivityIndicator size="large" color="#cb1313" testID="workoutActivity"/>
          </View>}
          {!workoutLoading &&
            <View style={styles.workoutView}>
              <View style={{ flex: 2 }}/>
              <View style={styles.workoutTextView}>
                <Text style={styles.workoutTitle}>{workout && workout.title}</Text>
                <Text style={styles.workoutType}>{workout ? workout.type : noWorkout}</Text>
                <Text style={styles.workoutText}>{workout && workout.description}</Text>
              </View>
              <View style={{ flex: 3 }}/>
            </View>}
        </View>
        <View style={{ marginBottom: 30, width: '80%' }}>
          <Calendar
            theme={calendarTheme}
            firstDay={1}
            onDayPress={onDayPress}
          />
        </View>
      </ScrollView>
    </View>
  )
}

function mapStateToProps ({ userReducer, workoutReducer }: any) {
  return {
    user: userReducer.user,
    workout: workoutReducer.workout,
    workoutLoading: workoutReducer.workoutLoading
  }
}

export default connect(mapStateToProps)(UserWorkout)
