import React, { useEffect } from 'react'
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { ProgramInterface, props } from '../../interfaces/interfaces'
import { loadPrograms, updateProgram } from '../../redux/actions/programActions'
import { randomImage } from '../../utils/randomImageFunction'

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
    position: 'relative',
    minWidth: '85%',
    maxWidth: '85%',
    minHeight: 150,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
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
    backgroundColor: '#cb1313',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 85,
    minHeight: 40,
    borderRadius: 4,
    elevation: 8
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
  backgroundImg: {
    flex: 1,
    resizeMode: 'contain',
    opacity: 0.4,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0
  }
})

function Programs ({ dispatch, programs, user }: props) {
  useEffect(() => {
    dispatch(loadPrograms(user.ownerOfBox!._id))
  }, [])

  function onPressUpdate (program: ProgramInterface) {
    dispatch(updateProgram(program))
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={true}
      >
        <Text style={styles.titleText} testID="programsTitle">Your programs</Text>
        {programs?.map((program: ProgramInterface) => (
        <View style={styles.programView} key={performance.now() * Math.random()}>
          <ImageBackground
            source={randomImage()}
            style= {styles.backgroundImg}
          />
          <View style={{ flex: 1 }}/>
          <View style={styles.programViewColumn}>
            <Text style={styles.text}>{program.name}</Text>
            <Text style={styles.text}>Sessions</Text>
            <Text style={styles.text}>{`per month: ${program.sessionsPerMonth}`}</Text>
          </View>
          <View style={{ flex: 2 }}/>
          <View style={styles.programViewColumn}>
            <View style={{ flex: 5 }}/>
            <TouchableOpacity
              style={{ ...styles.deleteButton, backgroundColor: '#14680c' }}
              onPress={() => { onPressUpdate(program) }}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}/>
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <View style={{ flex: 2 }}/>
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
