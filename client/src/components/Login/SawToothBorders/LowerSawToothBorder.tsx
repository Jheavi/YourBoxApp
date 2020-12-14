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

function LowerSawToothBorder ({ width }: any) {
  const firstTriangle = 30
  const triangles = Array.from({ length: Math.ceil(width / 50) }, (v, i) => firstTriangle + i * 50)

  return (
    <View style={styles.container}>
          <View style={styles.toothShape}/>
          {triangles.map((left) => {
            return <View style={{ ...styles.toothShape, left }} key={Math.random() * Math.random()} />
          }) }
    </View>
  )
}

export default LowerSawToothBorder
