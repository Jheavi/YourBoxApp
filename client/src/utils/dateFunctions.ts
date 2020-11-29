import dateObject from './dateInterface'

export function todayData (): dateObject {
  const today: Date = new Date()
  const day: number = today.getDate()
  const month: number = today.getMonth() + 1
  const year: number = today.getFullYear()

  return { day, month, year, todayString: `${year}-${month}-${day}` }
}
