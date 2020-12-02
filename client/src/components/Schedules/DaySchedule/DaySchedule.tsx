import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { dayScheduleProps, sessionInterface } from '../../../interfaces/interfaces'
import HourItem from '../HourItem/HourItem'
import FormModifySession from '../FormModifySession/FormModifySession'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  dayView: {
    flex: 1,
    width: width - 10,
    marginHorizontal: 5,
    position: 'relative'
  },
  dayText: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
    marginBottom: 20,
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  noScheduleText: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 70,
    lineHeight: 40
  },
  createButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#cb1313',
    minWidth: 40,
    minHeight: 40,
    borderRadius: 4,
    elevation: 5,
    zIndex: 100
  },
  createButtonText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function DaySchedule ({ weekDay }: dayScheduleProps) {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={styles.dayView}>
      <Text style={styles.dayText}>{weekDay.day}</Text>
      <TouchableOpacity style={styles.createButton} onPress={() => { setModalVisible(true) }}>
        <Text style={styles.createButtonText}>+</Text>
      </TouchableOpacity>
      <Modal
        style={styles.modal}
        animationIn="bounceIn"
        isVisible={modalVisible}
        onBackButtonPress={() => { setModalVisible(false) }}
        onBackdropPress={() => { setModalVisible(false) }}
      >
        <FormModifySession setModalVisible={setModalVisible} day={weekDay.day}/>
      </Modal>
      <View>
        {weekDay && (!weekDay.hours.length
          ? <Text style={styles.noScheduleText}>There is no schedule for this day</Text>
          : (weekDay.hours.map((session: sessionInterface) => {
              return <HourItem day={weekDay.day} session={session} key={performance.now() * Math.random()} />
            })
            ))
          }
      </View>
    </View>
  )
}

export default DaySchedule
