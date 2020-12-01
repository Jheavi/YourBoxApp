import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import configureStore from './src/redux/configureStore'
import Workout from './src/components/Workout/Workout'
import Header from './src/components/Header/Header'
import HomeScreen from './src/components/HomeScreen/HomeScreen'

const store = configureStore({})
const { Navigator, Screen } = createStackNavigator()

export default function App () {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator initialRouteName="Home">
          <Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: () => <Header />
          }} />
          <Screen
          name="AdminWorkout"
          component={Workout}
          options={{
            header: () => <Header />
          }}/>
        </Navigator>
      </NavigationContainer>
    </Provider>
  )
}
