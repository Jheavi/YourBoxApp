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

    test('should return weekDay = monday date is monday', () => {
      const { weekDay } = extractDataFromDate('2020-12-07')

      expect(weekDay).toBe('monday')
    })

    test('should return weekDay = tuesday date is tuesday', () => {
      const { weekDay } = extractDataFromDate('2020-12-08')

      expect(weekDay).toBe('tuesday')
    })

    test('should return weekDay = wednesday if date is wednesday', () => {
      const { weekDay } = extractDataFromDate('2020-12-09')

      expect(weekDay).toBe('wednesday')
    })

    test('should return weekDay = thursday if date is thursday', () => {
      const { weekDay } = extractDataFromDate('2020-12-10')

      expect(weekDay).toBe('thursday')
    })

    test('should return weekDay = friday if date is friday', () => {
      const { weekDay } = extractDataFromDate('2020-12-11')

      expect(weekDay).toBe('friday')
    })

    test('should return weekDay = saturday if date is saturday', () => {
      const { weekDay } = extractDataFromDate('2020-12-12')

      expect(weekDay).toBe('saturday')
    })

    test('should return weekDay = sunday if date is sunday', () => {
      const { weekDay } = extractDataFromDate('2020-12-13')

      expect(weekDay).toBe('sunday')
    })

    test('should return weekDay = error if date is error', () => {
      const { weekDay } = extractDataFromDate('fakedate')

      expect(weekDay).toBe('error')
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
