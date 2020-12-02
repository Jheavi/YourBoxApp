import React, { useEffect } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { scheduleInterface } from '../../interfaces/interfaces'
import { loadSchedules } from '../../redux/actions/schedulesActions'
import DaySchedule from './DaySchedule/DaySchedule'

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    height,
    alignItems: 'center',
    backgroundColor: '#0d0d0d'
  },
  titleText: {
    fontSize: 28,
    color: 'white',
    marginTop: 30
  }
})

function Schedules ({ schedules, dispatch }: any) {
  useEffect(() => {
    if (!schedules || !schedules.length) { dispatch(loadSchedules()) }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Your Schedules</Text>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
      >
        {schedules && schedules.length && schedules.map((schedule: scheduleInterface) => {
          return <DaySchedule weekDay={schedule} key={performance.now() * Math.random()} />
        })}
      </ScrollView>
    </View>
  )
}

function mapStateToProps ({ schedulesReducer }: any) {
  return {
    schedules: schedulesReducer.schedules
  }
}

export default connect(mapStateToProps)(Schedules)
