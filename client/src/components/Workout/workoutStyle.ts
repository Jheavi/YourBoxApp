import { Dimensions } from 'react-native'
import { CalendarTheme } from 'react-native-calendars'

const { height } = Dimensions.get('window')

interface workoutStyleInterface {
  container: object
  scrollContent: object
  square: object
  workoutTextView: object
  workoutTitle: object
  workoutType: object
  workoutText: object
  overlayModal: object
  image: object
  dayText: object
}

const workoutStyle: workoutStyleInterface = {
  container: {
    flex: 1,
    flexGrow: 1,
    height
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    fontFamily: 'Roboto, Open Sans, sans-serif',
    backgroundColor: '#0d0d0d'
  },
  square: {
    maxWidth: '80%',
    minWidth: '80%',
    minHeight: '30%',
    borderColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    height: 'auto',
    marginBottom: 30,
    position: 'relative'
  },
  workoutTextView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    width: '100%'
  },
  workoutTitle: {
    color: 'white',
    fontSize: 28,
    paddingTop: 20,
    textTransform: 'uppercase'
  },
  workoutType: {
    color: 'white',
    textAlign: 'left',
    paddingBottom: 10,
    paddingTop: 20,
    marginHorizontal: 30,
    fontSize: 22
  },
  workoutText: {
    color: 'white',
    textAlign: 'left',
    paddingBottom: 30,
    paddingTop: 5,
    marginHorizontal: 30,
    fontSize: 22
  },
  image: {
    resizeMode: 'cover',
    opacity: 0.4,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    marginBottom: 'auto',
    marginTop: 'auto'
  },
  dayText: {
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20
  },
  overlayModal: {
    backgroundColor: '#0d0d0d',
    borderColor: '#ffffff',
    borderWidth: 2
  }
}

const calendarTheme: CalendarTheme = {
  textSectionTitleColor: '#cb1313',
  calendarBackground: 'white',
  textDisabledColor: '#bbbbbb',
  todayTextColor: '#cb1313',
  arrowColor: 'white',
  dayTextColor: 'black',
  textMonthFontSize: 22,
  monthTextColor: 'white',
  'stylesheet.calendar.header': {
    header: {
      backgroundColor: '#cb1313',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      alignItems: 'center'
    }
  },
  'stylesheet.calendar.main': {
    container: {
      padding: 0,
      backgroundColor: '#ffffff'
    }
  }
}

export { workoutStyle, calendarTheme }
