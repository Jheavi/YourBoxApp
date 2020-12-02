import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome5'

const image = { uri: 'https://trello-attachments.s3.amazonaws.com/5fc6ad22e8f1971a74d3b3a5/5fc6ade260f98805ecff5fd0/7ccd1dcd43eb5d424c3e06b094ced535/baby-beast-crossfit.jpg' }

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

function HomeScreen ({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ImageBackground
      style={styles.backImage}
      source={image}
      />
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AdminWorkout')}
          style={styles.buttons}
        >
          <Icon
          name="dumbbell"
          size={50}
          color="white"
          />
          <Text style={styles.buttonsText}>Your workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AdminWorkout')}
          style={styles.buttons}
        >
          <Icon
          name="user"
          size={50}
          color="white"
          />
          <Text style={styles.buttonsText}>Your users</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AdminSchedules')}
          style={styles.buttons}
        >
          <Icon
          name="calendar"
          size={50}
          color="white"
          />
          <Text style={styles.buttonsText}>Your schedules</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AdminWorkout')}
          style={styles.buttons}
        >
          <Icon
          name="coins"
          size={50}
          color="white"
          />
          <Text style={styles.buttonsText}>Your programs</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default HomeScreen
