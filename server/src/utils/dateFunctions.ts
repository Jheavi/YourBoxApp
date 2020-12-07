import { dateObject } from '../interfaces/interfaces'

export function extractDataFromDate (date?: string): dateObject {
  const dayToFormat: Date = new Date(date || Date.now())
  const day: number = dayToFormat.getDate()
  const dayString: string = day > 9 ? `${day}` : `0${day}`
  const month: number = dayToFormat.getMonth() + 1
  const monthString: string = month > 9 ? `${month}` : `0${month}`
  const year: number = dayToFormat.getFullYear()
  const weekDayNumber: number = dayToFormat.getDay()
  let weekDay: string
  switch (weekDayNumber) {
    case 0:
      weekDay = 'sunday'
      break
    case 1:
      weekDay = 'monday'
      break
    case 2:
      weekDay = 'tuesday'
      break
    case 3:
      weekDay = 'wednesday'
      break
    case 4:
      weekDay = 'thursday'
      break
    case 5:
      weekDay = 'friday'
      break
    case 6:
      weekDay = 'saturday'
      break
    default:
      weekDay = 'error'
      break
  }

  return {
    day,
    month,
    year,
    dayString: `${year}-${monthString}-${dayString}`,
    formattedDate: `${dayString}/${monthString}/${year}`,
    weekDay
  }
}
