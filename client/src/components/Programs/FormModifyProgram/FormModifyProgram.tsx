import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { createProgram, updateProgram } from '../../../redux/actions/programActions'
import { props } from '../../../interfaces/interfaces'

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

function FormModifyProgram ({ dispatch, program, user }: props) {
  const [nameValue, setNameValue] = useState(program?.name)
  const [sessionsPerMonthValue, setSessionsPerMonthValue] = useState(program?.sessionsPerMonth || 0)

  function onPress () {
    if (program) {
      dispatch(updateProgram({
        ...program,
        name: nameValue.trim(),
        sessionsPerMonth: sessionsPerMonthValue
      }))
    } else {
      setNameValue(nameValue?.trim())
      dispatch(createProgram(
        nameValue,
        sessionsPerMonthValue,
        user.ownerOfBox!._id))
    }
  }

  return (
    <View style={styles.container} testID="container">
      <TextInput
        style={styles.nameText}
        value={nameValue}
        placeholder="Enter the name"
        placeholderTextColor="#ffffff88"
        testID="inputName"
        onChangeText={value => setNameValue(value) }
        autoCorrect={false}
      />
      <TextInput
        style={styles.sessionsText}
        value={sessionsPerMonthValue.toString()}
        placeholder="Enter the number of sessions"
        placeholderTextColor="#ffffff88"
        keyboardType="numeric"
        testID="inputSessions"
        onChangeText={value => setSessionsPerMonthValue(+(value.trim()))}
      />
      <TouchableOpacity
        style={styles.saveButton}
        onPress={onPress}
        testID="saveButton"
      >
        <Text style={styles.buttonText} testID="buttonText">
          {program && 'Save changes'}
          {!program && 'Create program'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

function mapStateToProps ({ userReducer: { user } }: any) {
  return {
    user
  }
}

export default connect(mapStateToProps)(FormModifyProgram)
