import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, Button, TextInput, ImageBackground, Dimensions } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { loadWorkout, updateWorkout } from '../../redux/actions/workoutActions'
import { todayData } from '../../utils/dateFunctions'
import PropTypes from 'prop-types'

const image = { uri: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    height
  },
  scrollContent: {
    alignItems: 'center',
    fontFamily: 'Roboto, Open Sans, sans-serif',
    backgroundColor: '#0d0d0d'
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
    margin: 30,
    position: 'relative'
  },
  workoutText: {
    color: 'white',
    padding: 30,
    fontSize: 25
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
  const [displayedDay, setDisplayedDay] = useState(todayString)
  const noWorkout = 'There is no workout for the selected day'
  const scrollRef = useRef<ScrollView>(null)

  useEffect(() => {
    dispatch(loadWorkout(todayString))
  }, [])

  useEffect(() => {
    if (workout) {
      setDescriptionValue(workout.description)
    } else {
      setDescriptionValue(noWorkout)
    }
  }, [workout])

  function scrollToStart () {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: 0,
        y: 0,
        animated: true
      })
    }
  }

  function onDayPress (day) {
    dispatch(loadWorkout(day.dateString))
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
        <View style={styles.square}>
          <ImageBackground source={image} style={styles.image} />
          <TextInput
            multiline={true}
            style={styles.workoutText}
            value={descriptionValue}
            onChangeText={text => setDescriptionValue(text)}
          />
        </View>
        <View style={{ marginBottom: 30, width: 'auto' }}>
          <Button
            title="Save changes"
            color="#14680c"
            onPress={() => dispatch(updateWorkout(
              displayedDay || todayString,
              descriptionValue))}
          />
        </View>
        <View style={{ marginBottom: 30 }}>
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

Workout.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state: any) {
  return {
    workout: state.workoutReducer.workout
  }
}

export default connect(mapStateToProps)(Workout)
