import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { images } from '../../constants/images'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'

  },
  buttons: {
    alignItems: 'center',
    margin: 40
  },
  buttonsText: {
    color: 'white',
    paddingTop: 8
  },
  backImage: {
    position: 'absolute',
    top: 0,
    marginVertical: 'auto',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.4
  }
})

function AdminHome ({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ImageBackground
      style={styles.backImage}
      source={images.homeScreen}
      />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AdminWorkout')}
            style={styles.buttons}
            testID="workoutBtn"
          >
            <Icon
            name="dumbbell"
            size={50}
            color="white"
            />
            <Text style={styles.buttonsText} testID="workoutTextBtn">Your workouts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AdminUsers')}
            style={styles.buttons}
            testID="usersBtn"
          >
            <Icon
            name="user"
            size={50}
            color="white"
            />
            <Text style={styles.buttonsText}>Your users</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AdminSchedules')}
            style={styles.buttons}
            testID="schedulesBtn"
          >
            <Icon
            name="calendar"
            size={50}
            color="white"
            />
            <Text style={styles.buttonsText}>Your schedules</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AdminPrograms')}
            style={styles.buttons}
          >
            <Icon
            name="coins"
            size={50}
            color="white"
            testID="programsBtn"
            />
            <Text style={styles.buttonsText}>Your programs</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default AdminHome
