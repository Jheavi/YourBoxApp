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
    top: 0,
    left: -10,
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderTopWidth: 30,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#0d0d0d'
  }
})

function UpperSawToothBorder () {
  return (
    <View style={styles.container}>
          <View style={styles.toothShape}/>
          <View style={{ ...styles.toothShape, left: 40 }}/>
          <View style={{ ...styles.toothShape, left: 90 }}/>
          <View style={{ ...styles.toothShape, left: 140 }}/>
          <View style={{ ...styles.toothShape, left: 190 }}/>
          <View style={{ ...styles.toothShape, left: 240 }}/>
          <View style={{ ...styles.toothShape, left: 290 }}/>
          <View style={{ ...styles.toothShape, left: 340 }}/>
    </View>
  )
}

export default UpperSawToothBorder
