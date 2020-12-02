import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import FormModifyHour from '../FormModifyHour/FormModifyHour'

const styles = StyleSheet.create({
  sessionText: {
    color: 'white',
    width: 150,
    textAlign: 'center',
    fontSize: 19
  },
  sessionView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 70,
    marginVertical: 5
  },
  modifyButton: {
    backgroundColor: '#14680c',
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    elevation: 8
  },
  modifyButtonText: {
    color: 'white',
    fontSize: 18
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function HourItem ({ day, session }: any) {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={{
      ...styles.sessionView,
      backgroundColor:
      session.type === 'WOD'
        ? '#014aa5'
        : session.type === 'Open Box'
          ? '#016500'
          : '#a20000'
    }} >
      <View style={{ flex: 1 }}/>
      <Text style={styles.sessionText}>{`${session.startHour}-${session.finishHour}`}</Text>
      <View style={{ flex: 2 }}/>
      <Text style={styles.sessionText}>{session.type}</Text>
      <View style={{ flex: 2 }}/>
      <TouchableOpacity
        style={styles.modifyButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.modifyButtonText}>Modify</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}/>
      <Modal
        style={styles.modal}
        animationIn="bounceIn"
        isVisible={modalVisible}
        onBackButtonPress={() => { setModalVisible(false) }}
        onBackdropPress={() => { setModalVisible(false) }}
      >
        <FormModifyHour session={session} setModalVisible={setModalVisible} day={day}/>
      </Modal>
    </View>
  )
}

export default HourItem
