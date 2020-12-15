import { PastSession } from '../interfaces/interfaces'
import { extractDataFromDate, sortBySession, sortByWeekDays } from './dateFunctions'

describe('Date Functions', () => {
  const RealDate = Date.now

  afterEach(() => {
    Date.now = RealDate
  })

  describe('extractDataFromDate', () => {
    test('should return an object with month and date > 9', () => {
      // Mocked Date-now to return always the date 25/November/2020 at 10:00
      const mockedTime = 1606296219142
      Date.now = jest.spyOn(Date, 'now').mockImplementation(() => mockedTime)
      const date = extractDataFromDate()

      expect(date).toEqual({
        day: 25,
        month: 11,
        year: 2020,
        hour: '10:00',
        dayString: '2020-11-25',
        formattedDate: '25/11/2020',
        weekDay: 'wednesday'
      })
    })

    test('should return an object with month and date < 10', () => {
      // Mocked Date-now to return always the date 02/September/2020 at 00:00
      const mockedTime = 1598999219142
      Date.now = jest.spyOn(Date, 'now').mockImplementation(() => mockedTime)
      const date = extractDataFromDate()

      expect(date).toEqual({
        day: 2,
        month: 9,
        year: 2020,
        hour: '00:00',
        dayString: '2020-09-02',
        formattedDate: '02/09/2020',
        weekDay: 'wednesday'
      })
    })

    test('should return the date formatted if date provided', () => {
      // Mocked Date-now to return always the date 02/September/2020
      const date = extractDataFromDate('2020-09-02')

      expect(date).toEqual({
        day: 2,
        month: 9,
        year: 2020,
        hour: '02:00',
        dayString: '2020-09-02',
        formattedDate: '02/09/2020',
        weekDay: 'wednesday'
      })
    })

    const scenaries = [
      { day: 'monday', date: '2020-12-07' },
      { day: 'tuesday', date: '2020-12-08' },
      { day: 'wednesday', date: '2020-12-09' },
      { day: 'thursday', date: '2020-12-10' },
      { day: 'friday', date: '2020-12-11' },
      { day: 'saturday', date: '2020-12-12' },
      { day: 'sunday', date: '2020-12-13' },
      { day: 'error', date: 'error' }
    ]
    scenaries.forEach(({ day, date }: {day: string, date:string}) => {
      test(`should return weekDay = ${day} date is ${day}`, () => {
        const { weekDay } = extractDataFromDate(date)

        expect(weekDay).toBe(day)
      })
    })
  })

  describe('sortByWeekDays', () => {
    test('should return 1 if dayOne.day is tuesday and dayTwo.day is monday', () => {
    // Mocked Date-now to return always the date 02/September/2020
      const dayOne = { day: 'tuesday', sessions: [] }
      const dayTwo = { day: 'monday', sessions: [] }

      const response = sortByWeekDays(dayOne, dayTwo)

      expect(response).toBe(1)
    })

    test('should return -1 if dayOne.day is monday and dayTwo.day is tuesday', () => {
    // Mocked Date-now to return always the date 02/September/2020
      const dayOne = { day: 'monday', sessions: [] }
      const dayTwo = { day: 'tuesday', sessions: [] }

      const response = sortByWeekDays(dayOne, dayTwo)

      expect(response).toBe(-1)
    })
  })

  describe('sortBySession', () => {
    let sessionOne: PastSession
    let sessionTwo: PastSession

    test('should return 1 if sessionOne has a previous date than sessionTwo', () => {
      sessionOne = { day: '2020-09-22', finishHour: '10:00', startHour: '09:00', type: 'WOD' }
      sessionTwo = { day: '2020-12-22', finishHour: '10:00', startHour: '09:00', type: 'WOD' }

      const response = sortBySession(sessionOne, sessionTwo)

      expect(response).toBe(1)
    })

    test('should return -1 if sessionOne has a later date than sessionTwo', () => {
      sessionOne = { day: '2020-12-22', finishHour: '10:00', startHour: '09:00', type: 'WOD' }
      sessionTwo = { day: '2020-09-22', finishHour: '10:00', startHour: '09:00', type: 'WOD' }

      const response = sortBySession(sessionOne, sessionTwo)

      expect(response).toBe(-1)
    })

    test('should return 1 if sessionOne has a previous startHour than sessionTwo', () => {
      sessionOne = { day: '2020-12-22', finishHour: '10:00', startHour: '09:00', type: 'WOD' }
      sessionTwo = { day: '2020-12-22', finishHour: '13:00', startHour: '12:00', type: 'WOD' }

      const response = sortBySession(sessionOne, sessionTwo)

      expect(response).toBe(1)
    })

    test('should return 1 if sessionOne has a later startHour than sessionTwo', () => {
      sessionOne = { day: '2020-12-22', finishHour: '13:00', startHour: '12:00', type: 'WOD' }
      sessionTwo = { day: '2020-12-22', finishHour: '10:00', startHour: '09:00', type: 'WOD' }

      const response = sortBySession(sessionOne, sessionTwo)

      expect(response).toBe(-1)
    })
  })
})
