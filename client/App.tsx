import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './src/redux/configureStore'
import Workout from './src/components/Workout/Workout'
import Header from './src/components/Header/Header'

const store = configureStore({})

export default function App () {
  return (
    <Provider store={store}>
      <Header />
      <Workout />
    </Provider>
  )
}
