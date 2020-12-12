import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { PastSession, props } from '../../interfaces/interfaces'
import ResultDetail from './ResultDetail/ResultDetail'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  titleText: {
    fontSize: 28,
    color: 'white',
    marginVertical: 30
  },
  scrollContent: {
    flexGrow: 1,
    width,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
    fontFamily: 'Roboto, Open Sans, sans-serif'
  }
})

function UserResults ({ user }: props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText} testID="programsTitle">Your bookings and results</Text>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={true}
      >
        {user.pastSessions.map((pastSession: PastSession) => (
          <ResultDetail
            pastSession={pastSession}
            key={performance.now() * Math.random()}
          />
        ))}
      </ScrollView>
    </View>
  )
}

function mapStateToProps ({ userReducer: { user } }: any) {
  return {
    user
  }
}

export default connect(mapStateToProps)(UserResults)
