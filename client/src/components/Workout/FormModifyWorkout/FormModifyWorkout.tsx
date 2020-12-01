import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, Button, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { updateWorkout } from '../../../redux/actions/workoutActions'
import formWorkoutStyles from './FormModifyWorkout'

function FormModifyWorkout ({ workout, dispatch, todayString, displayedDay, setModalVisible }: any) {
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

  return (
    <View style={formWorkoutStyles.container}>
      <View style={formWorkoutStyles.innerContainer}>
        <TextInput
          style={formWorkoutStyles.titleText}
          value={titleValue}
          placeholder="Enter the title"
          testID="inputTitle"
          onChangeText={text => setTitleValue(text)}
          autoCorrect={false}
          multiline={true}
        />
        <Picker
          style={formWorkoutStyles.picker}
          selectedValue={typeValue}
          onValueChange={(itemValue) =>
            setTypeValue(itemValue)
          }
          testID="picker"
        >
          <Picker.Item color="#0d0d0d" label="For Time" value="For Time" />
          <Picker.Item color="#0d0d0d" label="AMRAP" value="AMRAP" />
          <Picker.Item color="#0d0d0d" label="EMOM" value="EMOM" />
        </Picker>
        <TextInput
          style={formWorkoutStyles.descriptionText}
          value={descriptionValue}
          placeholder="Enter the workout"
          testID="inputDescription"
          onChangeText={text => setDescriptionValue(text)}
          multiline={true}
        />
        <View style={{ marginBottom: 30, width: 'auto' }}>
          <Button
            title="Save changes"
            color="#14680c"
            testID="saveButton"
            onPress={() => {
              dispatch(updateWorkout(
                displayedDay || todayString,
                descriptionValue,
                titleValue,
                typeValue))
              setModalVisible(false)
            }}
          />
        </View>
      </View>
    </View>
  )
}

function mapStateToProps (state: any) {
  return {
    workout: state.workoutReducer.workout
  }
}

export default connect(mapStateToProps)(FormModifyWorkout)
