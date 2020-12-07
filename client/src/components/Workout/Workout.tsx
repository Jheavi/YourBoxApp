import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, ImageBackground, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import { Calendar, DateObject } from 'react-native-calendars'
import { isWorkoutLoading, loadWorkout } from '../../redux/actions/workoutActions'
import { extractDataFromDate } from '../../utils/dateFunctions'
import { props } from '../../interfaces/interfaces'
import images from '../../constants/images'
import FormModifyWorkout from './FormModifyWorkout/FormModifyWorkout'
import { workoutStyle, calendarTheme } from './workoutStyle'

const styles = StyleSheet.create(workoutStyle)

function Workout ({ workout, workoutLoading, dispatch }: props) {
  const { dayString } = extractDataFromDate()
  const [displayedDay, setDisplayedDay] = useState(dayString)
  const [formattedDate, setFormattedDate] = useState(extractDataFromDate(displayedDay).formattedDate)
  const [modalVisible, setModalVisible] = useState(false)
  const noWorkout = 'There is no workout for the selected day'
  const scrollRef = useRef<ScrollView>(null)

  useEffect(() => {
    dispatch(loadWorkout(dayString))
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
        <Text style={styles.dayText} testID="workoutDate">{formattedDate}</Text>
        <View style={styles.square}>
          <ImageBackground source={images.workoutbackground} style={styles.image} />
          {workoutLoading &&
          <View style={styles.workoutTextView}>
            <ActivityIndicator size="large" color="#cb1313" testID="workoutActivity"/>
          </View>}
          {!workoutLoading &&
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
                  <FormModifyWorkout dayString={dayString} displayedDay={displayedDay} setModalVisible={setModalVisible}/>
                </Modal>
              </View>
            </TouchableWithoutFeedback>
          }
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
    workout: workoutReducer.workout,
    workoutLoading: workoutReducer.workoutLoading
  }
}

export default connect(mapStateToProps)(Workout)
