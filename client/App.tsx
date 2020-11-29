import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Calendar } from "react-native-calendars";

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flex: 1}}></View>
      <View style={styles.square}>
        <Text></Text>
      </View>
      <View style={{flex: 1}}></View>
      <Calendar
      theme={calendarTheme}
      firstDay={1}
      />
      <View style={{flex: 1}}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto, Open Sans, sans-serif',
    backgroundColor: '#000000',
  },
  square: {
    width: '80%',
    borderColor: 'white',
    borderWidth: 2,
    height: '25%'
  }
});

const calendarTheme = {
  textSectionTitleColor: '#cb1313',
  calendarBackground: 'white',
  selectedDayBackgroundColor: '#cb1313',
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
      backgroundColor: '#ffffff',
    }
  }
}