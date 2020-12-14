import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Overlay } from 'react-native-elements'
import { connect } from 'react-redux'
import { props, workoutInterface } from '../../../interfaces/interfaces'
import { isWorkoutLoading, loadWorkout } from '../../../redux/actions/workoutActions'
import { extractDataFromDate } from '../../../utils/dateFunctions'
import { randomImage } from '../../../utils/randomImageFunction'
import FormModifyResult from '../FormModifyResult/FormModifyResult'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '80%',
    height: 150,
    maxHeight: 150,
    marginBottom: 30,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    flexDirection: 'row'
  },
  backgroundImg: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 0.4,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0
  },
  resultViewColumn: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  leftText: {
    textAlign: 'left',
    fontSize: 20,
    color: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
  uploadButton: {
    backgroundColor: '#14680c',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 85,
    maxWidth: 140,
    minHeight: 40,
    borderRadius: 4,
    elevation: 8
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
  seeWorkoutBtn: {
    width: 'auto',
    height: 'auto'
  },
  overlayModal: {
    backgroundColor: '#0d0d0d',
    borderColor: '#ffffff',
    borderWidth: 2
  },
  workoutTextView: {
    flexDirection: 'column',
    marginHorizontal: 20,
    maxWidth: '60%',
    minWidth: '50%',
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center'
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
  }
})

function ResultDetail ({ dispatch, pastSession, user, workout, workoutLoading }: props) {
  const [modalWorkoutVisible, setModalWorkoutVisible] = useState(false)
  const [modalResultVisible, setModalResultVisible] = useState(false)
  const [resultWorkout, setResultWorkout] = useState<workoutInterface | null>(null)
  const [backgroundImg] = useState<{uri: string}>(randomImage())
  const noWorkout = 'There is no workout for the selected day'

  useEffect(() => {
    if (!resultWorkout && workout?.date === pastSession.day) {
      setResultWorkout(workout)
    }
  }, [workout])

  function onWorkoutPress () {
    if (!resultWorkout) {
      dispatch(loadWorkout(pastSession.day, user.affiliatedBox!._id))
      dispatch(isWorkoutLoading())
    }
    setModalWorkoutVisible(true)
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImg}
        style= {styles.backgroundImg}
      />
      <View style={{ flex: 2 }}/>
      <View style={styles.resultViewColumn}>
        {pastSession.type === 'WOD'
          ? (<TouchableOpacity
              style={styles.seeWorkoutBtn}
              testID="seeWorkoutModalBtn"
              onPress={onWorkoutPress}
            >
              <Text style={styles.leftText}>{extractDataFromDate(pastSession.day).formattedDate}</Text>
              <Text style={styles.leftText}>{`${pastSession.startHour} - ${pastSession.finishHour}`}</Text>
              <Text style={styles.text} testID="sessionType">{`${pastSession.type}`}</Text>
              <Overlay
                overlayStyle={styles.overlayModal}
                animationType="fade"
                isVisible={modalWorkoutVisible}
                onBackdropPress={() => { setModalWorkoutVisible(false) }}
                testID="workoutModal"
                >
                  <View style={styles.workoutTextView}>
                    {workoutLoading && <ActivityIndicator size="large" color="#cb1313" testID="workoutActivity"/>}
                    {!workoutLoading &&
                    <>
                      <Text style={resultWorkout && resultWorkout.title ? styles.workoutTitle : { height: 0 }}>{resultWorkout && resultWorkout.title}</Text>
                      <Text style={styles.workoutType}>{resultWorkout ? resultWorkout.type : noWorkout}</Text>
                      <Text style={styles.workoutText}>{resultWorkout && resultWorkout.description}</Text>
                    </>}
                  </View>
              </Overlay>
            </TouchableOpacity>)
          : (
            <>
              <Text style={styles.leftText}>{extractDataFromDate(pastSession.day).formattedDate}</Text>
              <Text style={styles.leftText}>{`${pastSession.startHour} - ${pastSession.finishHour}`}</Text>
              <Text style={styles.text} testID="sessionTypeNoWod">{`${pastSession.type}`}</Text>
            </>)
        }
      </View>
      <View style={{ flex: pastSession.type === 'WOD' ? 5 : 0 }}/>
        { pastSession.type === 'WOD'
          ? <>
              <View style={styles.resultViewColumn}>
                <View style={{ flex: 4 }}/>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ ...styles.leftText, marginRight: 8 }}>Result:</Text>
                  <Text style={styles.text}>{pastSession.result}</Text>
                </View>
                <View style={{ flex: 4 }}/>
                <TouchableOpacity
                  style={styles.uploadButton}
                  testID="seeResultModalBtn"
                  onPress={() => setModalResultVisible(true)}
                >
                  <Text style={styles.buttonText}>Upload result</Text>
                  <Overlay
                    overlayStyle={styles.overlayModal}
                    testID="resultModal"
                    animationType="fade"
                    isVisible={modalResultVisible}
                    onBackdropPress={() => { setModalResultVisible(false) }}
                  >
                    <FormModifyResult
                      pastSession={pastSession}
                      resultWorkout={resultWorkout || null}
                    />
                  </Overlay>
                </TouchableOpacity>
                <View style={{ flex: 2 }}/>
              </View>
            </>
          : <View />
        }
      <View style={{ flex: 2 }}/>
    </View>
  )
}

function mapStateToProps ({ workoutReducer: { workout, workoutLoading }, userReducer: { user } }: any) {
  return {
    user,
    workout,
    workoutLoading
  }
}

export default connect(mapStateToProps)(ResultDetail)
