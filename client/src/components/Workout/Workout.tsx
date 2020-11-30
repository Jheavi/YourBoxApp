import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, ImageBackground, Dimensions, Text, TouchableWithoutFeedback } from 'react-native'
import Modal from 'react-native-modal'
import { Calendar, DateObject } from 'react-native-calendars'
import { loadWorkout } from '../../redux/actions/workoutActions'
import { extractDataFromTodayDate, extractDataFromDate } from '../../utils/dateFunctions'
import PropTypes from 'prop-types'
import FormModifyWorkout from './FormModifyWorkout/FormModifyWorkout'

const image = { uri: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    height
  },
  scrollContent: {
    flexGrow: 1,
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
    fontSize: 26,
    paddingTop: 20
  },
  workoutText: {
    color: 'white',
    textAlign: 'left',
    paddingBottom: 30,
    paddingTop: 20,
    marginHorizontal: 30,
    fontSize: 22
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
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
    marginBottom: 10,
    fontSize: 20
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
  const { todayString } = extractDataFromTodayDate()
  const [displayedDay, setDisplayedDay] = useState(todayString)
  const [formattedDate, setFormattedDate] = useState(extractDataFromDate(displayedDay))
  const [modalVisible, setModalVisible] = useState(false)
  const noWorkout = 'There is no workout for the selected day'
  const scrollRef = useRef<ScrollView>(null)

  useEffect(() => {
    dispatch(loadWorkout(todayString))
  }, [])

  useEffect(() => {
    if (workout) {
      setDisplayedDay(workout.date)
    }
  }, [workout])

  useEffect(() => {
    if (displayedDay) {
      setFormattedDate(extractDataFromDate(displayedDay))
    }
  }, [displayedDay])

  function scrollToStart () {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: 0,
        y: 0,
        animated: true
      })
    }
  }

  function onDayPress (day: DateObject) {
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
        <Text style={styles.dayText}>{formattedDate && `${formattedDate.day}/${formattedDate.month}/${formattedDate.year}`}</Text>
        <View style={styles.square}>
          <ImageBackground source={image} style={styles.image} />
          <TouchableWithoutFeedback onPress={() => { setModalVisible(!modalVisible) }}>
            <View style={styles.workoutTextView}>
              <Text style={styles.workoutTitle}>{workout ? workout.title : noWorkout}</Text>
              <Text style={styles.workoutText}>{workout ? workout.description : noWorkout}</Text>
              <Modal
              style={styles.modal}
                animationIn="bounceIn"
                isVisible={modalVisible}
                onBackButtonPress={() => { setModalVisible(false) }}
                >
                <FormModifyWorkout todayString={todayString} displayedDay={displayedDay}/>
              </Modal>
            </View>
          </TouchableWithoutFeedback>
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
