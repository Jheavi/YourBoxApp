import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Overlay } from 'react-native-elements'
import { connect } from 'react-redux'
import { ProgramInterface, props } from '../../interfaces/interfaces'
import { loadPrograms } from '../../redux/actions/programActions'
import FormModifyProgram from './FormModifyProgram/FormModifyProgram'
import ProgramDetail from './ProgramDetail/ProgramDetail'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    position: 'relative'
  },
  scrollContent: {
    flexGrow: 1,
    width,
    alignItems: 'center',
    marginBottom: 30,
    fontFamily: 'Roboto, Open Sans, sans-serif'
  },
  titleText: {
    fontSize: 28,
    color: 'white',
    marginVertical: 30
  },
  createButton: {
    position: 'absolute',
    right: 30,
    top: 33,
    backgroundColor: '#cb1313',
    minWidth: 40,
    minHeight: 40,
    borderRadius: 4,
    elevation: 5,
    zIndex: 100
  },
  createButtonText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white'
  }
})

function Programs ({ dispatch, programs, user }: props) {
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    dispatch(loadPrograms(user.ownerOfBox!._id))
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.titleText} testID="programsTitle">Your programs</Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => { setModalVisible(true) }}
        testID="touchableModal"
      >
        <Text style={styles.createButtonText}>+</Text>
      </TouchableOpacity>
      <Overlay
        animationType="fade"
        isVisible={modalVisible}
        onBackdropPress={() => { setModalVisible(false) }}
        testID="programModal"
      >
        <FormModifyProgram />
      </Overlay>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={true}
      >
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
