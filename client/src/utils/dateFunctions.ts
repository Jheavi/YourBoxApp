import { scheduleInterface, dateObject } from '../interfaces/interfaces'

export function extractDataFromDate (date?: string): dateObject {
  const dayToFormat: Date = new Date(date || Date.now())
  const day: number = dayToFormat.getDate()
  const dayString: string = day > 9 ? `${day}` : `0${day}`
  const month: number = dayToFormat.getMonth() + 1
  const monthString: string = month > 9 ? `${month}` : `0${month}`
  const year: number = dayToFormat.getFullYear()

  return {
    day,
    month,
    year,
    dayString: `${year}-${monthString}-${dayString}`,
    formattedDate: `${dayString}/${monthString}/${year}`
  }
}

export function sortByWeekDays (dayOne: scheduleInterface, dayTWo: scheduleInterface) {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  const dayOneIndex = days.indexOf(dayOne.day)
  const dayTWoIndex = days.indexOf(dayTWo.day)
  return dayOneIndex > dayTWoIndex ? 1 : -1
}
