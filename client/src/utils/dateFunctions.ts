import { dateObject } from '../interfaces/interfaces'

export function extractDataFromTodayDate (): dateObject {
  const today: Date = new Date()
  const day: number = today.getDate()
  const dayString: string = day > 9 ? `${day}` : `0${day}`
  const month: number = today.getMonth() + 1
  const monthString: string = month > 9 ? `${month}` : `0${month}`
  const year: number = today.getFullYear()

  return { day, month, year, todayString: `${year}-${monthString}-${dayString}` }
}

export function extractDataFromDate (date: string): dateObject {
  const [year, month, day] = date.split('-')

  return { year: +year, month: +month, day: +day }
}
