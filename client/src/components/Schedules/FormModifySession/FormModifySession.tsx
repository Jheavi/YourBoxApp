import React, { useState } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import hourSelection from '../../../constants/hours'
import { createSession, updateSession } from '../../../redux/actions/schedulesActions'
import { connect } from 'react-redux'

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
  hoursText: {
    color: 'white',
    borderBottomColor: '#cb1313',
    borderBottomWidth: 2,
    fontSize: 24,
    marginBottom: 20,
    paddingBottom: 5,
    width: 80,
    textAlign: 'center'
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    marginBottom: 20,
    paddingBottom: 5,
    width: 'auto',
    textTransform: 'uppercase'
  },
  secondTitle: {
    width: '90%',
    color: 'white',
    textAlign: 'center'
  },
  picker: {
    height: 50,
    width: 85,
    backgroundColor: '#0d0d0d',
    color: 'white',
    marginBottom: 30,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  pickerItem: {
    textAlign: 'right'
  }
})

function FormModifySession ({ day, dispatch, session }: any) {
  const [finishHourValue, setFinishHourValue] = useState(session?.finishHour || '08:00')
  const [startHourValue, setStartHourValue] = useState(session?.startHour || '07:00')
  const [typeValue, setTypeValue] = useState(session?.type || 'WOD')
  console.log(`Modifying: ${session?.startHour}-${session?.finishHour} type ${session?.type}`)

  function onSavePress (): void {
    console.log('Session: ', session)

    if (session) {
      dispatch(updateSession(day, session, finishHourValue, startHourValue, typeValue))
    } else {
      dispatch(createSession(day, finishHourValue, startHourValue, typeValue))
    }
  }

  function onStartHourValueChange (itemValue: string | number): void {
    setStartHourValue(itemValue)
    const itemInArray = itemValue.toString().split(':')
    const finishHourModified = +itemInArray[0] + 1 < 10 ? `0${+itemInArray[0] + 1}:${itemInArray[1]}` : `${+itemInArray[0] + 1}:${itemInArray[1]}`
    setFinishHourValue(finishHourModified)
  }

  function onFinishHourValueChange (itemValue: string | number): void {
    setFinishHourValue(itemValue)
  }

  function onTypeValueChange (itemValue: string | number): void {
    setTypeValue(itemValue)
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleText} testID="textTitle">{day}</Text>
        <Text style={styles.secondTitle}>{session && 'Modifying session:'}</Text>
        <Text style={styles.secondTitle}>{session && `${session.startHour}-${session.finishHour}`}</Text>
        <Text style={{ ...styles.secondTitle, marginBottom: 20 }}>{session && `Type ${session.type}`}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Picker
            style={styles.picker}
            selectedValue={startHourValue}
            onValueChange={onStartHourValueChange}
            mode="dropdown"
            testID="startHourPicker"
          >
          {hourSelection.map((hour) => {
            return (
            <Picker.Item
              key={performance.now() * Math.random()}
              label={hour}
              value={hour}
            />)
          })}
          </Picker>
          <Picker
            style={styles.picker}
            selectedValue={finishHourValue}
            onValueChange={onFinishHourValueChange}
            mode="dropdown"
            testID="finishHourPicker"
            >
          {hourSelection.map((hour) => {
            return (
              <Picker.Item
              key={performance.now() * Math.random()}
              label={hour}
              value={hour}
              />)
          })}
          </Picker>
        </View>
        <Picker
          style={styles.picker}
          selectedValue={typeValue}
          onValueChange={onTypeValueChange}
          mode="dropdown"
          testID="typePicker"
        >
          <Picker.Item color="#0d0d0d" label="WOD" value="WOD" />
          <Picker.Item color="#0d0d0d" label="Open Box" value="Open Box" />
          <Picker.Item color="#0d0d0d" label="Olympics" value="Olympics" />
        </Picker>
        <View style={{ marginBottom: 30, width: 'auto' }}>
          <Button
            title="Save changes"
            color="#14680c"
            testID="saveButton"
            onPress={onSavePress}
          />
        </View>
      </View>
    </View>
  )
}

export default connect(null)(FormModifySession)
