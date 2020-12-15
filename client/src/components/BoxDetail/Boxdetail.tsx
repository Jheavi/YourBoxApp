import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { props } from '../../interfaces/interfaces'
import { loadSchedules } from '../../redux/actions/schedulesActions'

const styles = StyleSheet.create({
  gymView: {
    zIndex: 10,
    flex: 1,
    minHeight: 200,
    maxHeight: 200,
    marginBottom: 30,
    width: '100%',
    position: 'relative'
  },
  triangleShape: {
    zIndex: 10,
    position: 'absolute',
    width: 0,
    height: 0,
    right: 0,
    bottom: 0,
    borderLeftWidth: 220,
    borderBottomWidth: 60,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#000000'
  },
  gymBackImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  schedulesButton: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 100,
    position: 'absolute',
    fontSize: 20,
    bottom: 20,
    width: '50%',
    marginLeft: 15,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  schedulesButtonText: {
    color: 'white',
    fontSize: 24
  }
})

function BoxDetail ({ box, dispatch, navigation }: props) {
  function onPress () {
    navigation.navigate('AdminSchedules')
    dispatch(loadSchedules(box?._id))
  }

  return (
    <View >
      <View style={styles.gymView}>
      <ImageBackground
        style={styles.gymBackImage}
        source={{ uri: box?.photos[0] }}
      />
      <View style={styles.triangleShape}/>
      <TouchableOpacity
        style={styles.schedulesButton}
        activeOpacity={0.4}
        onPress= {onPress}
        testID="seeSchedulesBtn"
      >
        <Text style={styles.schedulesButtonText} testID="seeSchedulesBtnText">See schedules</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default connect(null)(BoxDetail)
