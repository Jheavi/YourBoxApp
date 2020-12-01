import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Button, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { updateWorkout } from '../../../redux/actions/workoutActions'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 500,
    borderColor: 'white',
    borderWidth: 2
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
    width: 'auto',
    textTransform: 'uppercase'
  },
  descriptionText: {
    color: 'white',
    borderColor: '#cb1313',
    borderWidth: 2,
    padding: 30,
    margin: 30
  },
  picker: {
    height: 50,
    width: 200,
    backgroundColor: '#0d0d0d',
    color: 'white'
  }
})

function FormModifyWorkout ({ workout, dispatch, todayString, displayedDay, setModalVisible }: any) {
  const [titleValue, setTitleValue] = useState(workout?.title)
  const [typeValue, setTypeValue] = useState(workout?.type)
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
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.titleText}
          value={titleValue}
          placeholder="Enter the title"
          testID="inputTitle"
          onChangeText={text => setTitleValue(text)}
        />
        <Picker
          style={styles.picker}
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
          style={styles.descriptionText}
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
