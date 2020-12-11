import React, { useEffect } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { ProgramInterface, props } from '../../interfaces/interfaces'
import { loadPrograms } from '../../redux/actions/programActions'
import ProgramDetail from './ProgramDetail/ProgramDetail'

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    position: 'relative'
  },
  scrollContent: {
    flexGrow: 1,
    height,
    width,
    alignItems: 'center',
    fontFamily: 'Roboto, Open Sans, sans-serif',
    backgroundColor: '#0d0d0d'
  },
  titleText: {
    fontSize: 28,
    color: 'white',
    marginVertical: 30
  }
})

function Programs ({ dispatch, programs, user }: props) {
  useEffect(() => {
    dispatch(loadPrograms(user.ownerOfBox!._id))
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={true}
      >
        <Text style={styles.titleText} testID="programsTitle">Your programs</Text>
        {programs?.map((program: ProgramInterface) => (
          <ProgramDetail program={program} key={performance.now() * Math.random()}/>
        ))}
      </ScrollView>
    </View>
  )
}

function mapStateToProps ({ userReducer: { user }, programReducer: { programs } }: any) {
  return {
    programs,
    user
  }
}

export default connect(mapStateToProps)(Programs)
