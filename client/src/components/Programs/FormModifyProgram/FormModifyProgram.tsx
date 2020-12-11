import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { updateProgram } from '../../../redux/actions/programActions'
import { ProgramInterface, props } from '../../../interfaces/interfaces'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0d0d',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    height: 'auto'
  },
  nameText: {
    color: 'white',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 2,
    fontSize: 25,
    marginVertical: 30,
    marginHorizontal: 30,
    paddingBottom: 5,
    width: 'auto',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  sessionsText: {
    color: 'white',
    fontSize: 35,
    width: 60,
    height: 'auto',
    textAlign: 'center',
    paddingBottom: 3,
    marginBottom: 30
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
    elevation: 8,
    marginBottom: 40
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  }
})

function FormModifyProgram ({ dispatch, program }: props) {
  const [nameValue, setNameValue] = useState(program?.name)
  const [sessionsPerMonthValue, setSessionsPerMonthValue] = useState(program?.sessionsPerMonth)

  function onPressUpdate (program: ProgramInterface) {
    dispatch(updateProgram({ ...program, name: nameValue, sessionsPerMonth: sessionsPerMonthValue }))
  }

  return (
    <View style={styles.container} testID="container">
      <TextInput
        style={styles.nameText}
        value={nameValue}
        placeholder="Enter the name"
        testID="inputName"
        onChangeText={text => setNameValue(text)}
        autoCorrect={false}
      />
      <TextInput
        style={styles.sessionsText}
        value={sessionsPerMonthValue.toString()}
        placeholder="Enter the number of sessions"
        testID="inputSessions"
        onChangeText={text => setSessionsPerMonthValue(+text)}
      />
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => onPressUpdate(program)}
      >
        <Text style={styles.buttonText}>Save changes</Text>
      </TouchableOpacity>
    </View>
  )
}

export default connect(null)(FormModifyProgram)
