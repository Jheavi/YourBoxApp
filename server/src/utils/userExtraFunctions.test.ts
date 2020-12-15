/* eslint-disable no-empty-pattern */
import userModel from '../models/userModel'
import { extractDataFromDate } from './dateFunctions'
import { changeReservedSessionsToPastSessions } from './userExtraFunctions'

jest.mock('../models/userModel')

describe('changeReservedSessionsToPastSessions', () => {
  let fakeUsers
  const { day, month, year, dayString } = extractDataFromDate()
  const pastDay = extractDataFromDate(`${year}-${month}-${day - 1}`)
  const nextDay = extractDataFromDate(`${year}-${month}-${day + 1}`)

  beforeEach(() => {
    fakeUsers = [{
      admin: false,
      reservedSessions: [
        {
          startHour: '10:00',
          day: pastDay.dayString
        },
        {
          startHour: '10:00',
          day: nextDay.dayString
        },
        {
          startHour: '10:00',
          day: dayString
        }
      ]
    }]
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('should call userModel.find', () => {
    userModel.find = jest.fn().mockResolvedValueOnce([])
    changeReservedSessionsToPastSessions()

    expect(userModel.find).toHaveBeenCalled()
  })

  test('should call userModel.bulkWrite', async () => {
    userModel.find = jest.fn().mockResolvedValueOnce(fakeUsers)
    userModel.bulkWrite = jest.fn().mockImplementationOnce(([], {}, callback) => {
      callback()
    })

    await changeReservedSessionsToPastSessions()

    expect(userModel.bulkWrite).toHaveBeenCalled()
  })

  test('should not call userModel.bulkWrite if promise rejected', async () => {
    userModel.find = jest.fn().mockRejectedValueOnce('error')

    await changeReservedSessionsToPastSessions()

    expect(userModel.bulkWrite).not.toHaveBeenCalled()
  })

  test('should not call userModel.bulkWrite if user has no sessions', async () => {
    fakeUsers = [{ admin: false, reservedSessions: [] }]
    userModel.find = jest.fn().mockResolvedValueOnce(fakeUsers)

    await changeReservedSessionsToPastSessions()

    expect(userModel.bulkWrite).not.toHaveBeenCalled()
  })
})
