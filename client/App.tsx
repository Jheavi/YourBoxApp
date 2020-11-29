import React from 'react'
import { Provider } from 'react-redux'
import Workout from './src/components/Workout/Workout'
import configureStore from './src/redux/configureStore'

const store = configureStore({})

export default function App () {
  return (
    <Provider store={store}>
      <Workout />
    </Provider>
  )
}
