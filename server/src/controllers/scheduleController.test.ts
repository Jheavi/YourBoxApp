const scheduleModel = require('../models/scheduleModel')
const scheduleControllerTest = require('./scheduleController')(scheduleModel)

jest.mock('../models/scheduleModel')

describe('scheduleController', () => {
  let res
  let req
  let fakeSchedule
  let fakeSchedules
  let fakeError

  beforeEach(() => {
    res = { send: jest.fn() }
    req = { body: { session: {} }, params: { date: '123' }, query: { boxId: '456' } }
    fakeSchedule = { sessions: ['today'] }
    fakeSchedules = [{ sessions: ['today'] }, { sessions: ['tomorrow'] }]
    fakeError = 'error'
  })

  test('getAllMethod should call res.send with the schedule', async () => {
    scheduleModel.find = jest.fn().mockResolvedValueOnce(fakeSchedule)

    await scheduleControllerTest.getAllMethod(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeSchedule)
  })

  test('getAllMethod should call res.send with the error if promise rejected', async () => {
    scheduleModel.find = jest.fn().mockRejectedValueOnce(fakeError)

    await scheduleControllerTest.getAllMethod(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeError)
  })

  test('getMethod should call res.send with the schedule', async () => {
    scheduleModel.findOne = jest.fn().mockResolvedValueOnce(fakeSchedule)

    await scheduleControllerTest.getMethod(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeSchedule)
  })

  test('getMethod should call res.send with the error if promise rejected', async () => {
    scheduleModel.findOne = jest.fn().mockRejectedValueOnce(fakeError)

    await scheduleControllerTest.getMethod(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeError)
  })

  test('patchSessionMethod should call findOneAndUpdate', async () => {
    scheduleModel.findOneAndUpdate = jest.fn()

    await scheduleControllerTest.patchSessionMethod(req, res)

    expect(scheduleModel.findOneAndUpdate).toHaveBeenCalled()
  })

  test('patchSessionMethod should call res.send with the schedules', async () => {
    scheduleModel.find = jest.fn().mockResolvedValueOnce(fakeSchedules)

    await scheduleControllerTest.patchSessionMethod(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeSchedules)
  })

  test('patchSessionMethod should call res.send with the error if promise rejected', async () => {
    scheduleModel.find = jest.fn().mockRejectedValueOnce(fakeError)

    await scheduleControllerTest.patchSessionMethod(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeError)
  })

  test('postMethod should call findOneAndUpdate', async () => {
    scheduleModel.findOneAndUpdate = jest.fn()

    await scheduleControllerTest.postMethod(req, res)

    expect(scheduleModel.findOneAndUpdate).toHaveBeenCalled()
  })

  test('postMethod should call res.send with the schedules', async () => {
    scheduleModel.find = jest.fn().mockResolvedValueOnce(fakeSchedules)

    await scheduleControllerTest.postMethod(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeSchedules)
  })

  test('postMethod should call res.send with the error if promise rejected', async () => {
    scheduleModel.find = jest.fn().mockRejectedValueOnce(fakeError)

    await scheduleControllerTest.postMethod(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeError)
  })
})
