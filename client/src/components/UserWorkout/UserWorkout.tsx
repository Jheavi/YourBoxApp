import React, { useEffect } from 'react'
import { ActivityIndicator, Dimensions, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Calendar, CalendarTheme } from 'react-native-calendars'
import { connect } from 'react-redux'
import images from '../../constants/images'
import { props } from '../../interfaces/interfaces'
import { isWorkoutLoading, loadWorkout } from '../../redux/actions/workoutActions'
import { extractDataFromTodayDate } from '../../utils/dateFunctions'

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
    alignItems: 'center',
    borderWidth: 2,
    height: 'auto',
    marginVertical: 30,
    position: 'relative'
  },
  workoutTextView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    width: '100%'
  },
  workoutTitle: {
    color: 'white',
    fontSize: 28,
    paddingTop: 20,
    textTransform: 'uppercase'
  },
  workoutType: {
    color: 'white',
    textAlign: 'left',
    paddingBottom: 10,
    paddingTop: 20,
    marginHorizontal: 30,
    fontSize: 22
  },
  workoutText: {
    color: 'white',
    textAlign: 'left',
    paddingBottom: 30,
    paddingTop: 5,
    marginHorizontal: 30,
    fontSize: 22
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
  const { todayString } = extractDataFromTodayDate()
  const noWorkout = 'There is no workout for the selected day'

  useEffect(() => {
    dispatch(loadWorkout(todayString!))
    dispatch(isWorkoutLoading())
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.square}>
          <ImageBackground source={images.workoutbackground} style={styles.image} />
          {workoutLoading &&
          <View style={styles.workoutTextView}>
            <ActivityIndicator size="large" color="#cb1313"/>
          </View>}
          {!workoutLoading &&
            <View style={styles.workoutTextView}>
              <Text style={styles.workoutTitle}>{workout && workout.title}</Text>
              <Text style={styles.workoutType}>{workout ? workout.type : noWorkout}</Text>
              <Text style={styles.workoutText}>{workout && workout.description}</Text>
            </View>}
        </View>
        <View style={{ marginBottom: 30, width: '80%' }}>
          <Calendar
            theme={calendarTheme}
            firstDay={1}
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
