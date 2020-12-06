import React, { useEffect } from 'react'
import { ActivityIndicator, Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Calendar, CalendarTheme } from 'react-native-calendars'
import Icon from 'react-native-vector-icons/Entypo'
import { connect } from 'react-redux'
import images from '../../constants/images'
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
  upperView: {
    marginTop: 60,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  upperIconResultsView: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 16
  },
  result: {
    color: 'white',
    fontSize: 20
  },
  upperText: {
    color: 'white',
    textAlign: 'left',
    paddingTop: 5,
    fontSize: 15
  },
  remainingClassesView: {
    flexDirection: 'column',
    marginHorizontal: 16
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
    marginBottom: 30,
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

function UserView ({ dispatch, workoutLoading, workout }: any) {
  const { todayString } = extractDataFromTodayDate()
  const noWorkout = 'There is no workout for the selected day'

  useEffect(() => {
    dispatch(loadWorkout(todayString!))
    dispatch(isWorkoutLoading())
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.upperView}>
        <View style={styles.upperIconResultsView}>
          <Icon
            name="blackboard"
            size={40}
            color="white"
          />
          <Text style={styles.result}>Your results</Text>
        </View>
        <View style={styles.remainingClassesView}>
          <Text style={styles.upperText}>Classes used this month: </Text>
          <Text style={styles.upperText}>Remaining classes: </Text>
        </View>
      </View>
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
    </View>
  )
}

function mapStateToProps ({ workoutReducer }: any) {
  return {
    workout: workoutReducer.workout,
    workoutLoading: workoutReducer.workoutLoading
  }
}

export default connect(mapStateToProps)(UserView)
