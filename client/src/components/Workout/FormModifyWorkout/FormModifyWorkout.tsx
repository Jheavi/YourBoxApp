import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { deleteWorkout, updateWorkout } from '../../../redux/actions/workoutActions'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 500
  },
  innerContainer: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  titleText: {
    color: 'white',
    borderBottomColor: '#cb1313',
    borderBottomWidth: 2,
    fontSize: 30,
    marginBottom: 20,
    paddingBottom: 5,
    width: 'auto'
  },
  descriptionText: {
    color: 'white',
    borderColor: '#cb1313',
    borderWidth: 2,
    padding: 30,
    margin: 30,
    fontSize: 20
  },
  modalButton: {
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

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 22,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: '#cb1313',
    borderBottomWidth: 1,
    textAlign: 'center',
    width: '100%',
    color: '#ffffff'
  }
})

function FormModifyWorkout ({ workout, dispatch, dayString, displayedDay, setModalVisible, user }: any) {
  const [titleValue, setTitleValue] = useState(workout?.title)
  const [typeValue, setTypeValue] = useState(workout?.type || 'For Time')
  const [descriptionValue, setDescriptionValue] = useState(workout?.description)
  const noWorkout = 'There is no workout for the selected day'

  useEffect(() => {
    if (workout) {
      setDescriptionValue(workout.description)
      setTitleValue(workout.title)
    } else {
      setDescriptionValue(noWorkout)
    }
  }, [workout])

  function onTypeChange (value: string): void {
    setTypeValue(value)
  }

  function onSave (): void {
    dispatch(updateWorkout(
      displayedDay || dayString,
      user.ownerOfBox._id,
      descriptionValue.trim(),
      titleValue.toUpperCase().trim(),
      typeValue
    ))
    setModalVisible(false)
  }

  function onDelete (): void {
    dispatch(deleteWorkout(
      displayedDay || dayString,
      user.ownerOfBox._id
    ))
    setModalVisible(false)
  }

  return (
    <View style={styles.container} testID="container">
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.titleText}
          value={titleValue}
          placeholder="Enter the title"
          testID="inputTitle"
          onChangeText={text => { setTitleValue(text) }}
          autoCorrect={false}
          multiline={true}
        />
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          placeholder={{}}
          style={pickerSelectStyles}
          value={typeValue}
          onValueChange={onTypeChange}
          items={[
            { label: 'For Time', value: 'For Time' },
            { label: 'AMRAP', value: 'AMRAP' },
            { label: 'EMOM', value: 'EMOM' }
          ]}
          pickerProps={{ testID: 'typePicker' }}
        />
        <TextInput
          style={styles.descriptionText}
          value={descriptionValue}
          placeholder="Enter the workout"
          testID="inputDescription"
          onChangeText={text => setDescriptionValue(text)}
          multiline={true}
        />
        <View style={{ marginBottom: 30, width: 'auto' }}>
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={onSave}
              testID="saveButton"
            >
              <Text style={styles.buttonText}>Save changes</Text>
            </TouchableOpacity>
          </View>
          {workout
            ? (<TouchableOpacity
              style={{ ...styles.modalButton, backgroundColor: '#cb1313' }}
              onPress={onDelete}
              testID="deleteButton"
            >
              <Text style={styles.buttonText}>Delete workout</Text>
            </TouchableOpacity>)
            : (<View style={{ height: 0 }}/>)}
        </View>
      </View>
    </View>
  )
}

function mapStateToProps ({ userReducer, workoutReducer }: any) {
  return {
    user: userReducer.user,
    workout: workoutReducer.workout
  }
}

export default connect(mapStateToProps)(FormModifyWorkout)
