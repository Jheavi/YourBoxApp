import { StyleSheet } from 'react-native'

const formWorkoutStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 500,
    borderColor: 'white',
    borderWidth: 2
  },
  innerContainer: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  titleText: {
    color: 'white',
    borderBottomColor: '#cb1313',
    borderBottomWidth: 2,
    fontSize: 30,
    marginBottom: 20,
    paddingBottom: 5,
    width: 'auto',
    textTransform: 'uppercase'
  },
  descriptionText: {
    color: 'white',
    borderColor: '#cb1313',
    borderWidth: 2,
    padding: 30,
    margin: 30
  },
  picker: {
    height: 50,
    width: 200,
    backgroundColor: '#0d0d0d',
    color: 'white'
  }
})

export default formWorkoutStyles
