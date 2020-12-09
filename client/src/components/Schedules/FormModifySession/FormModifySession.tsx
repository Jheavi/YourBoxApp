import React, { useState } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import hourSelection from '../../../constants/hourSelection'
import { createSession, updateSession } from '../../../redux/actions/schedulesActions'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 500
  },
  innerContainer: {
    backgroundColor: '#0d0d0d',
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
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 22,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: '#ffffff',
    borderWidth: 1,
    textAlign: 'center',
    width: '100%',
    borderRadius: 8,
    color: '#ffffff'
  }
})

function FormModifySession ({ day, dispatch, session }: any) {
  const [finishHourValue, setFinishHourValue] = useState(session?.finishHour || '08:00')
  const [startHourValue, setStartHourValue] = useState(session?.startHour || '07:00')
  const [typeValue, setTypeValue] = useState(session?.type || 'WOD')

  function onSavePress (): void {
    if (session) {
      dispatch(updateSession(day, session, finishHourValue, startHourValue, typeValue))
    } else {
      dispatch(createSession(day, finishHourValue, startHourValue, typeValue))
    }
  }

  function onStartHourValueChange (itemValue: string | number): void {
    setStartHourValue(itemValue)
    const [hour, minutes] = itemValue.toString().split(':')
    const finishHourModified = +hour + 1 < 10 ? `0${+hour + 1}:${minutes}` : `${+hour + 1}:${minutes}`
    setFinishHourValue(finishHourModified)
  }

  function onFinishHourValueChange (itemValue: string | number): void {
    setFinishHourValue(itemValue)
    if (itemValue <= startHourValue) {
      const [hour, minutes] = itemValue.toString().split(':')
      const startHourModified = +hour - 1 < 10 ? `0${+hour - 1}:${minutes}` : `${+hour - 1}:${minutes}`
      setStartHourValue(startHourModified)
    }
  }

  function onTypeValueChange (itemValue: string | number): void {
    setTypeValue(itemValue)
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleText} testID="textTitle">{day}</Text>
        {session && <>
          <Text style={styles.secondTitle}>Modifying session:</Text>
          <Text style={styles.secondTitle}>{`${session.type}   ${session.startHour}-${session.finishHour}`}</Text>
        </>}
        {!session && <>
          <Text style={styles.secondTitle}>Creating new session</Text>
        </>}
        <View style={{ flexDirection: 'row', marginTop: 30 }}>
          <View style={{ flex: 1 }}/>
          <RNPickerSelect
            placeholder={{}}
            style={pickerSelectStyles}
            value={startHourValue}
            onValueChange={onStartHourValueChange}
            // testID="startHourPicker"
            items={hourSelection.slice(0, hourSelection.length - 2).map((hour) => ({ label: hour, value: hour }))}
            useNativeAndroidPickerStyle={false}
            pickerProps={{ mode: 'dropdown' }}
          />
          <View style={{ flex: 1 }}/>
          <RNPickerSelect
            placeholder={{}}
            style={pickerSelectStyles}
            value={finishHourValue}
            onValueChange={onFinishHourValueChange}
            // testID="finishHourPicker"
            items={hourSelection.slice(2).map((hour) => ({ label: hour, value: hour }))}
            useNativeAndroidPickerStyle={false}
            pickerProps={{ mode: 'dropdown' }}
          />
          <View style={{ flex: 1 }}/>
        </View>
        <View style={{ marginVertical: 30 }}>
          <RNPickerSelect
            placeholder={{}}
            style={pickerSelectStyles}
            value={typeValue}
            onValueChange={onTypeValueChange}
            // testID="typePicker"
            pickerProps={{ mode: 'dropdown' }}
            items={[
              { label: 'WOD', value: 'WOD' },
              { label: 'Open Box', value: 'Open Box' },
              { label: 'Olympics', value: 'Olympics' }
            ]}
            useNativeAndroidPickerStyle={false}
          />
        </View>
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
