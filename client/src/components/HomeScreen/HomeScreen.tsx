import React from 'react'
import { Button, Text, View } from 'react-native'
import PropTypes from 'prop-types'

function HomeScreen ({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('AdminWorkout')}
      />
    </View>
  )
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default HomeScreen
