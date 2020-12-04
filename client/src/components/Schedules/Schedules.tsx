import React, { useEffect } from 'react'
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { scheduleInterface } from '../../interfaces/interfaces'
import { loadSchedules, isSchedulesLoading } from '../../redux/actions/schedulesActions'
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

function Schedules ({ schedules, schedulesLoading, dispatch }: any) {
  useEffect(() => {
    if (!schedules || !schedules.length) {
      dispatch(loadSchedules())
      dispatch(isSchedulesLoading())
    }
  }, [])

  return (
    <>
      {schedulesLoading &&
      <View style={{ ...styles.container, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#cb1313"/>
      </View>
      }
      {!schedulesLoading &&
      <View style={styles.container}>
      <Text style={styles.titleText} testID="schedulesTitle">Your Schedules</Text>
      <ScrollView
      horizontal={true}
      pagingEnabled={true}
      >
      {schedules && schedules.length && schedules.map((weekDay: scheduleInterface) => {
        return <DaySchedule weekDay={weekDay} key={performance.now() * Math.random()} />
      })}
      </ScrollView>
      </View>
    }
    </>
  )
}

function mapStateToProps ({ schedulesReducer }: any) {
  return {
    schedules: schedulesReducer.schedules,
    schedulesLoading: schedulesReducer.schedulesLoading
  }
}

export default connect(mapStateToProps)(Schedules)
