import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './src/redux/configureStore'
import Navigation from './src/components/Navigation/Navigation'

const store = configureStore({})

export default function App () {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}
