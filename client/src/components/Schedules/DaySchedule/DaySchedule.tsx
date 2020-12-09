import React, { useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { dayScheduleProps, SessionInterface } from '../../../interfaces/interfaces'
import SessionItem from '../SessionItem/SessionItem'
import FormModifySession from '../FormModifySession/FormModifySession'
import { connect } from 'react-redux'
import { Overlay } from 'react-native-elements'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  dayView: {
    flex: 1,
    width: width - 10,
    marginHorizontal: 5,
    position: 'relative'
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#0d0d0d'
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
  }
})

function DaySchedule ({ weekDay, user }: dayScheduleProps) {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={styles.dayView}>
      <Text style={styles.dayText} testID={'dayScheduleTitle'}>{weekDay.day}</Text>
      {user?.admin &&
      <>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => { setModalVisible(true) }}
          testID="touchableModal"
        >
          <Text style={styles.createButtonText}>+</Text>
        </TouchableOpacity>
        <Overlay
          animationType="fade"
          isVisible={modalVisible}
          onBackdropPress={() => { setModalVisible(false) }}
          testID="sessionModal"
        >
          <FormModifySession day={weekDay.day}/>
        </Overlay>
      </>}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {weekDay && (!weekDay.sessions.length
          ? <Text style={styles.noScheduleText}>There is no schedule for this day</Text>
          : (weekDay.sessions.map((session: SessionInterface) => {
              return <SessionItem day={weekDay.day} session={session} key={performance.now() * Math.random()} />
            })
            ))
          }
      </ScrollView>
    </View>
  )
}

function mapStateToProps ({ userReducer }: any) {
  return {
    user: userReducer.user
  }
}

export default connect(mapStateToProps)(DaySchedule)
