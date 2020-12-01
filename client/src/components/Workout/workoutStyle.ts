import { Dimensions } from 'react-native'

const height = Dimensions.get('window').height

interface workoutStyleInterface {
  container: object
  scrollContent: object
  square: object
  workoutTextView: object
  workoutTitle: object
  workoutType: object
  workoutText: object
  modal: object
  image: object
  dayText: object
}

interface calendarThemeInterface {
  textSectionTitleColor: string
  calendarBackground: string
  textDisabledColor: string
  todayTextColor: string
  arrowColor: string
  dayTextColor: string
  textMonthFontSize: number
  monthTextColor: string
  textMonthBackground: string
  'stylesheet.calendar.header': object
  'stylesheet.calendar.main': object
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
    fontSize: 26,
    paddingTop: 20
  },
  workoutType: {
    color: 'white',
    textAlign: 'left',
    paddingBottom: 10,
    paddingTop: 10,
    marginHorizontal: 30,
    fontSize: 22
  },
  workoutText: {
    color: 'white',
    textAlign: 'left',
    paddingBottom: 30,
    paddingTop: 10,
    marginHorizontal: 30,
    fontSize: 22
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
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
  }
}

const calendarTheme: calendarThemeInterface = {
  textSectionTitleColor: '#cb1313',
  calendarBackground: 'white',
  textDisabledColor: '#bbbbbb',
  todayTextColor: '#cb1313',
  arrowColor: 'white',
  dayTextColor: 'black',
  textMonthFontSize: 22,
  monthTextColor: 'white',
  textMonthBackground: '#cb1313',
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
