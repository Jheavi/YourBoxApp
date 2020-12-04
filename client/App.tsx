import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import configureStore from './src/redux/configureStore'
import Workout from './src/components/Workout/Workout'
import Header from './src/components/Header/Header'
import HomeScreen from './src/components/HomeScreen/HomeScreen'
import Schedules from './src/components/Schedules/Schedules'
import Login from './src/components/Login/Login'

const store = configureStore({})
const { Navigator, Screen } = createStackNavigator()

const header = {
  header: () => <Header />
}

export default function App () {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator initialRouteName="Home">
          <Screen
            name="Home"
            component={HomeScreen}
            options={header}
          />
          <Screen
            name="AdminWorkout"
            component={Workout}
            options={header}
          />
          <Screen
            name="AdminSchedules"
            component={Schedules}
            options={header}
          />
          <Screen
            name="Login"
            component={Login}
            options={header}
          />
        </Navigator>
      </NavigationContainer>
    </Provider>
  )
}
