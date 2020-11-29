import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { loadWorkout } from '../../redux/actions/workoutActions'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto, Open Sans, sans-serif',
    backgroundColor: '#000000'
  },
  square: {
    width: '80%',
    borderColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    height: '25%'
  },
  workoutText: {
    color: 'white'
  }
})

const calendarTheme = {
  textSectionTitleColor: '#cb1313',
  calendarBackground: 'white',
  selectedDayBackgroundColor: '#cb1313',
  textDisabledColor: '#bbbbbb',
  todayTextColor: '#cb1313',
  arrowColor: 'white',
  dayTextColor: 'black',
  textMonthFontSize: 22,
  monthTextColor: 'white',
  textMonthBackground: '#cb1313',
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

function Workout ({ workout, dispatch }: any) {
  console.log(workout)

  useEffect(() => {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    dispatch(loadWorkout(`${year}-${month}-${day}`))
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flex: 1 }}></View>
      <View style={styles.square}>
        <Text style={styles.workoutText}>{workout.description}</Text>
      </View>
      <View style={{ flex: 1 }}></View>
      <Calendar
      theme={calendarTheme}
      firstDay={1}
      />
      <View style={{ flex: 1 }}></View>
    </ScrollView>
  )
}

Workout.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state: any) {
  return {
    workout: state.workoutReducer.workout
  }
}

export default connect(mapStateToProps)(Workout)
