import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, ImageBackground, Text, TouchableWithoutFeedback } from 'react-native'
import Modal from 'react-native-modal'
import { Calendar, DateObject } from 'react-native-calendars'
import { loadWorkout } from '../../redux/actions/workoutActions'
import { extractDataFromTodayDate, extractDataFromDate } from '../../utils/dateFunctions'
import { props } from '../../interfaces/interfaces'
import FormModifyWorkout from './FormModifyWorkout/FormModifyWorkout'
import { workoutStyle, calendarTheme } from './workoutStyle'

const image = { uri: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }

const styles = StyleSheet.create(workoutStyle)

function Workout ({ workout, dispatch }: props) {
  const { todayString } = extractDataFromTodayDate()
  const [displayedDay, setDisplayedDay] = useState(todayString)
  const [formattedDate, setFormattedDate] = useState(extractDataFromDate(displayedDay))
  const [modalVisible, setModalVisible] = useState(false)
  const noWorkout = 'There is no workout for the selected day'
  const scrollRef = useRef<ScrollView>(null)

  useEffect(() => {
    dispatch(loadWorkout(todayString!))
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
        <Text style={styles.dayText} testID="workoutDate">{formattedDate && `${formattedDate.day}/${formattedDate.month}/${formattedDate.year}`}</Text>
        <View style={styles.square}>
          <ImageBackground source={image} style={styles.image} />
          <TouchableWithoutFeedback onPress={() => { setModalVisible(!modalVisible) }} testID="touchableForModal">
            <View style={styles.workoutTextView}>
              <Text style={styles.workoutTitle}>{workout && workout.title}</Text>
              <Text style={styles.workoutType}>{workout ? workout.type : noWorkout}</Text>
              <Text style={styles.workoutText}>{workout && workout.description}</Text>
              <Modal
                testID="workoutModal"
                style={styles.modal}
                animationIn="bounceIn"
                isVisible={modalVisible}
                onBackButtonPress={() => { setModalVisible(false) }}
                onBackdropPress={() => { setModalVisible(false) }}
                >
                <FormModifyWorkout todayString={todayString} displayedDay={displayedDay} setModalVisible={setModalVisible}/>
              </Modal>
            </View>
          </TouchableWithoutFeedback>
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

function mapStateToProps ({ workoutReducer }: any) {
  return {
    workout: workoutReducer.workout
  }
}

export default connect(mapStateToProps)(Workout)