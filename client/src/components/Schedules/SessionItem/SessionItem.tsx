import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Overlay } from 'react-native-elements'
import { connect } from 'react-redux'
import FormModifySession from '../FormModifySession/FormModifySession'

const styles = StyleSheet.create({
  sessionView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 70,
    maxHeight: 70,
    marginVertical: 5,
    borderRadius: 25,
    paddingHorizontal: 8
  },
  sessionText: {
    color: 'white',
    width: 150,
    textAlign: 'center',
    fontSize: 19
  },
  modifyButton: {
    backgroundColor: '#218520',
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
  overlayModal: {
    backgroundColor: '#0d0d0d',
    borderColor: '#ffffff',
    borderWidth: 2
  }
})

function SessionItem ({ day, session, user }: any) {
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
    }}
      testID="sessionContainer"
    >
      <View style={{ flex: 1 }}/>
      <Text style={styles.sessionText} testID="hourText">{`${session.startHour} - ${session.finishHour}`}</Text>
      <View style={{ flex: 2 }}/>
      <Text style={styles.sessionText}>{session.type}</Text>
      <View style={{ flex: 2 }}/>
      {user?.admin &&
      <>
        <TouchableOpacity
          style={styles.modifyButton}
          onPress={() => setModalVisible(true)}
          testID="touchableModal"
        >
          <Text style={styles.modifyButtonText}>Modify</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}/>
        <Overlay
          overlayStyle={styles.overlayModal}
          animationType="fade"
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false) }
          testID="sessionModal"
        >
          <FormModifySession session={session} day={day}/>
        </Overlay>
      </>}
    </View>
  )
}

function mapStateToProps ({ userReducer }: any) {
  return {
    user: userReducer.user
  }
}

export default connect(mapStateToProps)(SessionItem)
