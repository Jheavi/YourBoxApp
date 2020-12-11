import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, ImageBackground, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { Calendar, DateObject } from 'react-native-calendars'
import { isWorkoutLoading, loadWorkout } from '../../redux/actions/workoutActions'
import { extractDataFromDate } from '../../utils/dateFunctions'
import { props } from '../../interfaces/interfaces'
import { images } from '../../constants/images'
import FormModifyWorkout from './FormModifyWorkout/FormModifyWorkout'
import { workoutStyle, calendarTheme } from './workoutStyle'
import { Overlay } from 'react-native-elements'

const styles = StyleSheet.create(workoutStyle)

function Workout ({ user, workout, workoutLoading, dispatch }: props) {
  const { dayString } = extractDataFromDate()
  const [displayedDay, setDisplayedDay] = useState(dayString)
  const [formattedDate, setFormattedDate] = useState(extractDataFromDate(displayedDay).formattedDate)
  const [modalVisible, setModalVisible] = useState(false)
  const noWorkout = 'There is no workout for the selected day'
  const scrollRef = useRef<ScrollView>(null)

  useEffect(() => {
    dispatch(loadWorkout(dayString, user.ownerOfBox!._id))
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
    dispatch(loadWorkout(day.dateString, user.ownerOfBox!._id))
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
                <Overlay
                  overlayStyle={styles.overlayModal}
                  testID="workoutModal"
                  animationType="fade"
                  isVisible={modalVisible}
                  onBackdropPress={() => { setModalVisible(false) }}
                >
                  <FormModifyWorkout dayString={dayString} displayedDay={displayedDay} setModalVisible={setModalVisible}/>
                </Overlay>
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

function mapStateToProps ({ userReducer, workoutReducer }: any) {
  return {
    user: userReducer.user,
    workout: workoutReducer.workout,
    workoutLoading: workoutReducer.workoutLoading
  }
}

export default connect(mapStateToProps)(Workout)
