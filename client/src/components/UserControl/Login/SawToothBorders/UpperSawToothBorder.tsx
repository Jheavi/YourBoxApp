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

function UpperSawToothBorder ({ width }: any) {
  const firstTriangle = 40
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

export default UpperSawToothBorder
