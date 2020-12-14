import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { connect } from 'react-redux'
import { ProgramInterface, props } from '../../../interfaces/interfaces'
import { loadPrograms } from '../../../redux/actions/programActions'
import { updateUserProgram } from '../../../redux/actions/userActions'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0d0d',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    width: '85%',
    height: 'auto'
  },
  saveButton: {
    backgroundColor: '#14680c',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 85,
    minHeight: 40,
    borderRadius: 4,
    elevation: 8
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 22,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: '#ffffff',
    borderWidth: 1,
    marginBottom: 30,
    textAlign: 'center',
    width: '100%',
    borderRadius: 8,
    color: '#ffffff'
  }
})

function FormChangeUserProgram ({ affiliatedUser, dispatch, programs, user }: props) {
  const [programName, setProgramName] = useState(affiliatedUser.affiliatedProgram?.name)

  useEffect(() => {
    if (!programs.length) {
      dispatch(loadPrograms(user.ownerOfBox!._id))
    }
  }, [affiliatedUser])

  function onSavePress () {
    const programId = programs.find((program: ProgramInterface) => program.name === programName)!._id
    dispatch(updateUserProgram(programId, affiliatedUser.userId))
  }

  return (
    <View style={styles.container} testID="container">
      <Text style={styles.buttonText}>Changing the program</Text>
      <Text style={{ ...styles.buttonText, marginBottom: 30 }}>to user: {affiliatedUser.name}</Text>
      <RNPickerSelect
        useNativeAndroidPickerStyle={false}
        placeholder={{}}
        style={pickerSelectStyles}
        value={programName}
        onValueChange={(value: string) => setProgramName(value)}
        items={programs?.map((program: ProgramInterface) => ({
          label: program.name,
          value: program.name
        }))}
        pickerProps={{ mode: 'dropdown', testID: 'programPicker' }}
      />
      <TouchableOpacity
        style={styles.saveButton}
        onPress={onSavePress}
        testID="saveButton"
      >
        <Text style={styles.buttonText} testID="buttonText">Update Program</Text>
      </TouchableOpacity>
    </View>
  )
}

function mapStateToProps ({ programReducer: { programs }, userReducer: { user } }: any) {
  return {
    programs,
    user
  }
}

export default connect(mapStateToProps)(FormChangeUserProgram)
