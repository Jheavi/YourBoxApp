import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { dayScheduleProps } from '../../../interfaces/interfaces'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  dayText: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
    marginBottom: 20,
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  dayView: {
    flex: 1,
    width: width - 5,
    marginHorizontal: 5
  },
  hourText: {
    color: 'white',
    width: 150,
    textAlign: 'center',
    fontSize: 19
  },
  hourView: {
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
    padding: 5,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    elevation: 3
  },
  modifyButtonText: {
    color: 'white',
    fontSize: 19
  }
})

function DaySchedule ({ item }: dayScheduleProps) {
  return (
    <View style={styles.dayView}>
      <Text style={styles.dayText}>{item.day}</Text>
      <View>
        {item && item.hours.map((hour) => {
          return (
          <View key={performance.now() * Math.random()} style={{
            ...styles.hourView,
            backgroundColor:
            hour.type === 'WOD'
              ? '#0061ba'
              : hour.type === 'Open Box'
                ? '#14680c'
                : '#cb1313'
          }} >
            <View style={{ flex: 1 }}/>
            <Text style={styles.hourText}>{`${hour.startHour}-${hour.finishHour}`}</Text>
            <View style={{ flex: 2 }}/>
            <Text style={styles.hourText}>{hour.type}</Text>
            <View style={{ flex: 2 }}/>
            <TouchableOpacity
            style={styles.modifyButton}
            onPress={() => alert(`Modifying ${hour.type} from ${item.day} at ${hour.startHour}!`)}
            >
              <Text style={styles.modifyButtonText}>Modify</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}/>
          </View>)
        })}
      </View>
    </View>
  )
}

export default DaySchedule
