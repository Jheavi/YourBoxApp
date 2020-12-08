import { extractDataFromDate } from './dateFunctions'

describe('Date Functions', () => {
  const RealDate = Date.now

  afterEach(() => {
    Date.now = RealDate
  })

  test('extractDataFromDate should return an object with month and date > 9', () => {
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

  test('extractDataFromDate should return an object with month and date < 10', () => {
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

  test('extractDataFromDate should return the date formatted if date provided', () => {
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

  test('extractDataFromDate should return weekDay = monday date is monday', () => {
    const { weekDay } = extractDataFromDate('2020-12-07')

    expect(weekDay).toBe('monday')
  })

  test('extractDataFromDate should return weekDay = tuesday date is tuesday', () => {
    const { weekDay } = extractDataFromDate('2020-12-08')

    expect(weekDay).toBe('tuesday')
  })

  test('extractDataFromDate should return weekDay = wednesday if date is wednesday', () => {
    const { weekDay } = extractDataFromDate('2020-12-09')

    expect(weekDay).toBe('wednesday')
  })

  test('extractDataFromDate should return weekDay = thursday if date is thursday', () => {
    const { weekDay } = extractDataFromDate('2020-12-10')

    expect(weekDay).toBe('thursday')
  })

  test('extractDataFromDate should return weekDay = friday if date is friday', () => {
    const { weekDay } = extractDataFromDate('2020-12-11')

    expect(weekDay).toBe('friday')
  })

  test('extractDataFromDate should return weekDay = saturday if date is saturday', () => {
    const { weekDay } = extractDataFromDate('2020-12-12')

    expect(weekDay).toBe('saturday')
  })

  test('extractDataFromDate should return weekDay = sunday if date is sunday', () => {
    const { weekDay } = extractDataFromDate('2020-12-13')

    expect(weekDay).toBe('sunday')
  })

  test('extractDataFromDate should return weekDay = error if date is error', () => {
    const { weekDay } = extractDataFromDate('fakedate')

    expect(weekDay).toBe('error')
  })
})
