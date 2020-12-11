import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import IconFont5 from 'react-native-vector-icons/FontAwesome5'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { images } from '../../constants/images'
import { props } from '../../interfaces/interfaces'
import { extractDataFromDate } from '../../utils/dateFunctions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  backImage: {
    position: 'absolute',
    top: 0,
    marginVertical: 'auto',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.4
  },
  remainingClassesView: {
    flexDirection: 'column',
    marginHorizontal: 16
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
    marginVertical: 40
  },
  buttonsText: {
    color: 'white',
    paddingTop: 8,
    fontSize: 15
  },
  lowerView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  lowerText: {
    color: 'white',
    textAlign: 'left',
    paddingTop: 5,
    fontSize: 20
  }
})

function UserHome ({ navigation, user }: props) {
  const pastSessionsThisMonth = user.pastSessions.filter((session) => extractDataFromDate(session.day).month === extractDataFromDate().month).length
  const reservedSessionsThisMonth = user.reservedSessions.filter((session) => extractDataFromDate(session.day).month === extractDataFromDate().month).length

  return (
    <View style={styles.container}>
      <ImageBackground
      style={styles.backImage}
      source={images.homeScreen}
      />
      <View style={{ flex: 2 }}/>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}/>
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserWorkout')}
            style={styles.buttons}
            >
            <IconFont5
            name="dumbbell"
            size={50}
            color="white"
            testID="workoutBtn"
            />
            <Text style={styles.buttonsText} testID="workoutTextBtn">Workout of the day</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => navigation.navigate('UserSchedules')}
            >
            <IconFont5
            name="calendar"
            size={50}
            color="white"
            testID="bookBtn"
            />
            <Text style={styles.buttonsText}>Book</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}/>
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity style={styles.buttons}>
            <IconEntypo
              name="blackboard"
              size={50}
              color="white"
              />
            <Text style={styles.buttonsText}>Your results</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            >
            <IconMaterialIcons
            name="view-agenda"
            size={50}
            color="white"
            />
            <Text style={styles.buttonsText}>Your bookings</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}/>
      </View>
      <View style={{ flex: 0.25 }}/>
      <View style={styles.lowerView}>
        <View style={styles.remainingClassesView}>
          <Text style={styles.lowerText} testID="sessionsText">{`Sessions used this month: ${pastSessionsThisMonth}`}</Text>
          <Text style={styles.lowerText}>{`Sessions actually reserved: ${reservedSessionsThisMonth}`}</Text>
          <Text style={styles.lowerText} testID="remainingText">{`Remaining sessions: ${typeof user.affiliatedProgram === 'object'
                ? user.affiliatedProgram.sessionsPerMonth - pastSessionsThisMonth - reservedSessionsThisMonth
                : '0'}`}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}/>
    </View>
  )
}

function mapStateToProps ({ userReducer }: any) {
  return {
    user: userReducer.user
  }
}

export default connect(mapStateToProps)(UserHome)
