import { extractDataFromDate, extractDataFromTodayDate } from './dateFunctions'

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
})
