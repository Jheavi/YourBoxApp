import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { dayScheduleProps, sessionInterface } from '../../../interfaces/interfaces'
import HourItem from '../HourItem/HourItem'

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
  noScheduleText: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 70,
    lineHeight: 40
  },
  dayView: {
    flex: 1,
    width: width - 10,
    marginHorizontal: 5
  }
})

function DaySchedule ({ weekDay }: dayScheduleProps) {
  return (
    <View style={styles.dayView}>
      <Text style={styles.dayText}>{weekDay.day}</Text>
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
