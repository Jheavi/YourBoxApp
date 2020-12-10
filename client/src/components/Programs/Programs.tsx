import React, { useEffect } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { ProgramInterface, props } from '../../interfaces/interfaces'
import { loadPrograms } from '../../redux/actions/programActions'

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
  },
  programView: {
    width: '85%',
    height: 150,
    alignItems: 'center',
    backgroundColor: 'blue',
    marginBottom: 30,
    borderRadius: 10,
    flexDirection: 'row'
  },
  programViewColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#cb1313',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
    minHeight: 40,
    borderRadius: 4,
    elevation: 5,
    zIndex: 100
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
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
          <View style={styles.programView} key={performance.now() * Math.random()}>
            <View style={{ flex: 1 }}/>
            <View style={styles.programViewColumn}>
              <Text style={styles.text}>{program.name}</Text>
              <Text style={styles.text}>{`Sessions per month:
              ${program.sessionsPerMonth}`}</Text>
            </View>
            <View style={{ flex: 1 }}/>
            <View style={styles.programViewColumn}>
              <View style={{ flex: 1 }}/>
              <TouchableOpacity style={{ ...styles.deleteButton, backgroundColor: '#14680c' }}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }}/>
              <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }}/>
            </View>
            <View style={{ flex: 1 }}/>
          </View>
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
