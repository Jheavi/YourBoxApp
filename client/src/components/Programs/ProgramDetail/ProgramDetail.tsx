import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Overlay } from 'react-native-elements'
import { connect } from 'react-redux'
import { props } from '../../../interfaces/interfaces'
import { randomImage } from '../../../utils/randomImageFunction'
import FormModifyProgram from '../FormModifyProgram/FormModifyProgram'

const styles = StyleSheet.create({
  programView: {
    position: 'relative',
    minWidth: '85%',
    maxWidth: '85%',
    minHeight: 150,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 10,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: 'white',
    flexDirection: 'row'
  },
  backgroundImg: {
    flex: 1,
    resizeMode: 'contain',
    opacity: 0.5,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0
  },
  programViewColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
  deleteButton: {
    backgroundColor: '#cb1313',
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
  },
  overlayModal: {
    backgroundColor: '#0d0d0d',
    borderColor: '#ffffff',
    borderWidth: 2
  }
})

function ProgramDetail ({ program }: props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [backgroundImg] = useState(randomImage())

  return (
    <View style={styles.programView}>
      <ImageBackground
        source={backgroundImg}
        style= {styles.backgroundImg}
      />
      <View style={{ flex: 3 }}/>
      <View style={styles.programViewColumn}>
        <Text style={styles.text} testID="programName">{program.name}</Text>
        <Text style={styles.text}>Sessions</Text>
        <Text style={styles.text} testID="programSessions">{`per month: ${program.sessionsPerMonth}`}</Text>
      </View>
      <View style={{ flex: 4 }}/>
      <View style={styles.programViewColumn}>
        <View style={{ flex: 5 }}/>
        <TouchableOpacity
          style={{ ...styles.deleteButton, backgroundColor: '#14680c' }}
          onPress={() => { setModalVisible(true) }}
          testID="touchableModal"
        >
          <Text style={styles.buttonText}>Update</Text>
          <Overlay
            overlayStyle={styles.overlayModal}
            testID="programModal"
            animationType="fade"
            isVisible={modalVisible}
            onBackdropPress={() => { setModalVisible(false) }}
          >
            <FormModifyProgram program={program} />
          </Overlay>
        </TouchableOpacity>
        <View style={{ flex: 2 }}/>
      </View>
      <View style={{ flex: 1 }}/>
    </View>
  )
}

export default connect(null)(ProgramDetail)
