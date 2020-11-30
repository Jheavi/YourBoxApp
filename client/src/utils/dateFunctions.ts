import { dateObject } from '../interfaces/interfaces'

export function extractDataFromTodayDate (): dateObject {
  const today: Date = new Date()
  const day: number = today.getDate()
  const month: number = today.getMonth() + 1
  const year: number = today.getFullYear()

  return { day, month, year, todayString: `${year}-${month}-${day}` }
}

export function extractDataFromDate (date: string) {
  const [year, month, day] = date.split('-')

  return { year: +year, month: +month, day: +day }
}
