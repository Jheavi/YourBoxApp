import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { props, workoutInterface } from '../../../interfaces/interfaces'
import { loadWorkout } from '../../../redux/actions/workoutActions'
import { updateResult } from '../../../redux/actions/userActions'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 200,
    minHeight: 200
  },
  resultText: {
    color: 'white',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 2,
    fontSize: 30,
    marginBottom: 20,
    paddingBottom: 5,
    minWidth: 40,
    maxWidth: 120,
    textAlign: 'center'
  },
  saveButton: {
    backgroundColor: '#14680c',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 22,
    textAlign: 'center'
  }
})

function FormModifyResult ({ dispatch, pastSession, user, resultWorkout, workout }: props) {
  const [resultValue, setResultValue] = useState(pastSession?.result?.toString() || '')
  const [resultWorkoutValue, setResultWorkoutValue] = useState<workoutInterface | null>(null)

  useEffect(() => {
    if (!resultWorkout && !workout) {
      dispatch(loadWorkout(pastSession.day, user.affiliatedBox!._id))
    }
  }, [])

  useEffect(() => {
    if (resultWorkout) {
      setResultWorkoutValue(resultWorkout)
    } else if (!resultWorkoutValue && workout?.date === pastSession.day) {
      setResultWorkoutValue(workout)
    }
  }, [workout])

  function onUpdateResult () {
    dispatch(updateResult(pastSession, user, resultValue))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText} testID="resultTitle">
        {resultWorkoutValue?.type === 'For Time' && 'Time:'}
        {resultWorkoutValue?.type === 'AMRAP' && 'Reps:'}
        {resultWorkoutValue?.type === 'EMOM' && 'Minutes completed:'}
      </Text>
      <TextInput
        style={styles.resultText}
        value={resultValue}
        placeholder="Enter the result"
        keyboardType={resultWorkoutValue?.type === 'AMRAP' ? 'numeric' : 'default'}
        testID="inputResult"
        onChangeText={text => { setResultValue(text) }}
        autoCorrect={false}
      />
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={onUpdateResult}
          testID="saveButton"
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
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

export default connect(mapStateToProps)(FormModifyResult)
