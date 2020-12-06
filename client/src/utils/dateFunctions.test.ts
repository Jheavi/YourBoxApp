import { extractDataFromDate, extractDataFromTodayDate, sortByWeekDays } from './dateFunctions'

describe('Date Functions', () => {
  const RealDate = Date.now

  beforeEach(() => {

  })

  afterEach(() => {
    Date.now = RealDate
  })

  test('extractDataFromDate should return an object with date info splitted', () => {
    const date = extractDataFromDate('2020-09-22')

    expect(date).toEqual({
      day: 22,
      month: 9,
      year: 2020
    })
  })

  test('extractDataFromTodayDate should return an object with month and date > 9', () => {
    // Mocked Date-now to return always the date 25/November/2020
    const now = 1606296219142
    Date.now = jest.spyOn(Date, 'now').mockImplementation(() => now)
    const date = extractDataFromTodayDate()

    expect(date).toEqual({
      day: 25,
      month: 11,
      year: 2020,
      todayString: '2020-11-25'
    })
  })

  test('extractDataFromTodayDate should return an object with month and date < 10', () => {
    // Mocked Date-now to return always the date 02/September/2020
    const now = 1598999219142
    Date.now = jest.spyOn(Date, 'now').mockImplementation(() => now)
    const date = extractDataFromTodayDate()

    expect(date).toEqual({
      day: 2,
      month: 9,
      year: 2020,
      todayString: '2020-09-02'
    })
  })

  test('sortByWeekDays should return 1 if dayOne.day is tuesday and dayTwo.day is monday', () => {
    // Mocked Date-now to return always the date 02/September/2020
    const dayOne = { day: 'tuesday', sessions: [] }
    const dayTwo = { day: 'monday', sessions: [] }

    const response = sortByWeekDays(dayOne, dayTwo)

    expect(response).toBe(1)
  })

  test('sortByWeekDays should return -1 if dayOne.day is monday and dayTwo.day is tuesday', () => {
    // Mocked Date-now to return always the date 02/September/2020
    const dayOne = { day: 'monday', sessions: [] }
    const dayTwo = { day: 'tuesday', sessions: [] }

    const response = sortByWeekDays(dayOne, dayTwo)

    expect(response).toBe(-1)
  })
})
