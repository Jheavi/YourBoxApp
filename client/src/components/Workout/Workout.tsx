import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, Button, TextInput } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { loadWorkout, updateWorkout } from '../../redux/actions/workoutActions'
import { todayData } from '../../utils/dateFunctions'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto, Open Sans, sans-serif',
    backgroundColor: '#0d0d0d'
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
  const [descriptionValue, setDescriptionValue] = useState(workout?.description)
  const { todayString } = todayData()

  useEffect(() => {
    loadWorkout(todayString)
  }, [])

  useEffect(() => {
    if (workout) {
      setDescriptionValue(workout.description)
    }
  }, [workout])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flex: 1 }} />
      <View style={styles.square}>
        <TextInput
        style={styles.workoutText}
        value={descriptionValue}
        onChangeText={text => setDescriptionValue(text)}
        />
      </View>
      <Button
      title="Save changes"
      onPress={() => dispatch(updateWorkout(
        workout.date || todayString,
        descriptionValue))}
      />
      <View style={{ flex: 1 }}/>
      <Calendar
      theme={calendarTheme}
      firstDay={1}
      />
      <View style={{ flex: 1 }}/>
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
