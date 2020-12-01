import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { dayScheduleProps } from '../../../interfaces/interfaces'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  dayText: {
    fontSize: 22,
    color: 'white',
    marginTop: 10,
    textTransform: 'capitalize',
    textAlign: 'center'
  },
  dayView: {
    flex: 1,
    width
  }
})

function DaySchedule ({ item }: dayScheduleProps) {
  return (
    <View style={styles.dayView}>
      <Text style={styles.dayText}>{item}</Text>
    </View>
  )
}

export default DaySchedule
