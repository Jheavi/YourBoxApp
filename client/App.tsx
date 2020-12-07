import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './src/redux/configureStore'
import Navigation from './src/components/Navigation/Navigation'
import { NavigationContainer } from '@react-navigation/native'

const store = configureStore({})

export default function App () {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  )
}
