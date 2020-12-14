import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Overlay } from 'react-native-elements'
import { connect } from 'react-redux'
import { props } from '../../../interfaces/interfaces'
import { toggleUserActive } from '../../../redux/actions/userActions'
import FormChangeUserProgram from '../FormChangeUserProgram/FormChangeUserProgram'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    backgroundColor: '#0d0d0d',
    position: 'relative',
    minWidth: '85%',
    maxWidth: '85%',
    maxHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    flexDirection: 'row'
  },
  nameText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
    textTransform: 'capitalize'
  },
  text: {
    fontSize: 14,
    color: '#bbbbbb',
    textAlignVertical: 'bottom',
    marginRight: 5
  },
  infoText: {
    fontSize: 15,
    color: 'white',
    textAlignVertical: 'bottom'
  },
  avatarView: {
    width: 100,
    height: 100,
    overflow: 'hidden'
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 240,
    resizeMode: 'contain'
  },
  deleteButton: {
    position: 'absolute',
    backgroundColor: '#14680c',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 'auto',
    borderRadius: 4,
    elevation: 8,
    bottom: 15,
    right: 0
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

function UserListDetail ({ dispatch, affiliatedUser }: props) {
  const [modalVisible, setModalVisible] = useState(false)

  function onActivatePress () {
    dispatch(toggleUserActive(affiliatedUser))
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }}/>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flex: 2 }}/>
        <View style={styles.avatarView}>
          <Image source={{ uri: affiliatedUser.avatar }} style={styles.avatar}/>
        </View>
        <View style={{ flex: 1 }}/>
        <Text style={styles.nameText} testID="userName">{affiliatedUser.name}</Text>
        <View style={{ flex: 2 }}/>
      </View>
      <View style={{ flex: 3 }}/>
        <View style={{ flexDirection: 'column', position: 'relative' }}>
          <View style={{ flex: 1 }}/>
          <Text style={styles.text}>Email:</Text>
          <Text style={styles.infoText}>{affiliatedUser.email}</Text>
          <View style={{ flex: 1 }}/>
          <TouchableOpacity
            testID="touchableModal"
            onPress={() => { setModalVisible(true) }}
          >
            <Text style={styles.text}>Actual program:</Text>
            <Text style={styles.infoText} testID="affiliatedProgramName">
              {affiliatedUser.affiliatedProgram ? affiliatedUser.affiliatedProgram.name : 'none'}
            </Text>
            <Overlay
              overlayStyle={styles.overlayModal}
              isVisible={modalVisible}
              animationType="fade"
              testID="programModal"
              onBackdropPress={() => { setModalVisible(false) }}
            >
              <FormChangeUserProgram affiliatedUser={affiliatedUser}/>
            </Overlay>
          </TouchableOpacity>
          <View style={{ flex: 1 }}/>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>Active user:</Text>
            <Text style={styles.infoText}>{affiliatedUser.active ? 'Yes' : 'No'}</Text>
          </View>
          <View style={{ flex: 8 }}/>
          <TouchableOpacity
            style={styles.deleteButton}
            testID="activateBtn"
            onPress={onActivatePress}
          >
            <Text style={styles.buttonText} testID="activateBtnText">{affiliatedUser.active ? 'Inactivate' : 'Activate'}</Text>
          </TouchableOpacity>
        </View>
      <View style={{ flex: 3 }}/>
    </View>
  )
}

export default connect(null)(UserListDetail)
