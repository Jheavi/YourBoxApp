import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import hourSelection from '../../../constants/hourSelection'
import { createSession, deleteSession, updateSession } from '../../../redux/actions/schedulesActions'
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
  },
  modalButton: {
    backgroundColor: '#14680c',
    paddingVertical: 5,
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
    borderColor: '#ffffff',
    borderWidth: 1,
    textAlign: 'center',
    width: '100%',
    borderRadius: 8,
    color: '#ffffff'
  }
})

function FormModifySession ({ day, dispatch, session, user }: any) {
  const [finishHourValue, setFinishHourValue] = useState(session?.finishHour || '08:00')
  const [startHourValue, setStartHourValue] = useState(session?.startHour || '07:00')
  const [typeValue, setTypeValue] = useState(session?.type || 'WOD')

  function onSavePress (): void {
    if (session) {
      dispatch(updateSession(user.ownerOfBox._id, day, session, finishHourValue, startHourValue, typeValue))
    } else {
      dispatch(createSession(user.ownerOfBox._id, day, finishHourValue, startHourValue, typeValue))
    }
  }

  function onDeletePress (): void {
    dispatch(deleteSession(user.ownerOfBox._id, day, session))
  }

  function onStartHourValueChange (value: string): void {
    setStartHourValue(value)
    const [hour, minutes] = value.split(':')
    const finishHourModified = +hour + 1 < 10 ? `0${+hour + 1}:${minutes}` : `${+hour + 1}:${minutes}`
    setFinishHourValue(finishHourModified)
  }

  function onFinishHourValueChange (value: string): void {
    setFinishHourValue(value)
    if (value <= startHourValue) {
      const [hour, minutes] = value.split(':')
      const startHourModified = +hour - 1 < 10 ? `0${+hour - 1}:${minutes}` : `${+hour - 1}:${minutes}`
      setStartHourValue(startHourModified)
    }
  }

  function onTypeValueChange (value: string): void {
    setTypeValue(value)
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
            useNativeAndroidPickerStyle={false}
            placeholder={{}}
            style={pickerSelectStyles}
            value={startHourValue}
            onValueChange={onStartHourValueChange}
            items={hourSelection.slice(0, hourSelection.length - 2).map((hour) => ({
              label: hour,
              value: hour
            }))}
            pickerProps={{ mode: 'dropdown', testID: 'startHourPicker' }}
          />
          <View style={{ flex: 1 }}/>
          <RNPickerSelect
            placeholder={{}}
            style={pickerSelectStyles}
            value={finishHourValue}
            onValueChange={onFinishHourValueChange}
            items={hourSelection.slice(2).map((hour) => ({ label: hour, value: hour }))}
            useNativeAndroidPickerStyle={false}
            pickerProps={{ mode: 'dropdown', testID: 'finishHourPicker' }}
          />
          <View style={{ flex: 1 }}/>
        </View>
        <View style={{ marginVertical: 30 }}>
          <RNPickerSelect
            placeholder={{}}
            style={pickerSelectStyles}
            value={typeValue}
            onValueChange={onTypeValueChange}
            pickerProps={{ mode: 'dropdown', testID: 'typePicker' }}
            items={[
              { label: 'WOD', value: 'WOD' },
              { label: 'Open Box', value: 'Open Box' },
              { label: 'Olympics', value: 'Olympics' }
            ]}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        <View style={{ marginBottom: 30, width: 'auto' }}>
          <View style={{ marginBottom: 15 }}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={onSavePress}
              testID="saveButton"
            >
              <Text style={styles.buttonText}>Save changes</Text>
            </TouchableOpacity>
          </View>
          {session &&
            <TouchableOpacity
              style={{ ...styles.modalButton, backgroundColor: '#cb1313' }}
              onPress={onDeletePress}
              testID="deleteButton"
            >
              <Text style={styles.buttonText}>Delete session</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  )
}

function mapStateToProps ({ userReducer }: any) {
  return {
    user: userReducer.user
  }
}

export default connect(mapStateToProps)(FormModifySession)
