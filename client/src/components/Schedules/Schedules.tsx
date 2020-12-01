import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import DaySchedule from './DaySchedule/DaySchedule'

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    height
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#0d0d0d'
  },
  titleText: {
    fontSize: 28,
    color: 'white',
    marginTop: 30
  }
})

function Schedules ({ schedules }: any) {
  const daysWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.titleText}>Your Schedules</Text>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
        >
          {daysWeek.map((day) => {
            return <DaySchedule item={day} key={day} />
          })}
        </ScrollView>
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
