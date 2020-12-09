import React from 'react'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%'
  },
  toothShape: {
    zIndex: 10,
    position: 'absolute',
    width: 0,
    height: 0,
    bottom: 0,
    left: -20,
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderBottomWidth: 30,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#0d0d0d'
  }
})

function UpperSawToothBorder () {
  return (
    <View style={styles.container}>
          <View style={styles.toothShape}/>
          <View style={{ ...styles.toothShape, left: 30 }}/>
          <View style={{ ...styles.toothShape, left: 80 }}/>
          <View style={{ ...styles.toothShape, left: 130 }}/>
          <View style={{ ...styles.toothShape, left: 180 }}/>
          <View style={{ ...styles.toothShape, left: 230 }}/>
          <View style={{ ...styles.toothShape, left: 280 }}/>
          <View style={{ ...styles.toothShape, left: 330 }}/>
          <View style={{ ...styles.toothShape, left: 380 }}/>
    </View>
  )
}

export default UpperSawToothBorder
