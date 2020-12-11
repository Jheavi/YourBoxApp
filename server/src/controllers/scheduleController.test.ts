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

  describe('getAllMethod', () => {
    test('should call res.send with the schedule', async () => {
      scheduleModel.find = jest.fn().mockResolvedValueOnce(fakeSchedule)

      await scheduleControllerTest.getAllMethod(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeSchedule)
    })

    test('should call res.send with the error if promise rejected', async () => {
      scheduleModel.find = jest.fn().mockRejectedValueOnce(fakeError)

      await scheduleControllerTest.getAllMethod(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })

  describe('getMethod', () => {
    test('should call res.send with the schedule', async () => {
      scheduleModel.findOne = jest.fn().mockResolvedValueOnce(fakeSchedule)

      await scheduleControllerTest.getMethod(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeSchedule)
    })

    test('should call res.send with the error if promise rejected', async () => {
      scheduleModel.findOne = jest.fn().mockRejectedValueOnce(fakeError)

      await scheduleControllerTest.getMethod(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })

  describe('patchSessionMethod', () => {
    test('should call findOneAndUpdate', async () => {
      scheduleModel.findOneAndUpdate = jest.fn()

      await scheduleControllerTest.patchSessionMethod(req, res)

      expect(scheduleModel.findOneAndUpdate).toHaveBeenCalled()
    })

    test('should call res.send with the schedules', async () => {
      scheduleModel.find = jest.fn().mockResolvedValueOnce(fakeSchedules)

      await scheduleControllerTest.patchSessionMethod(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeSchedules)
    })

    test('should call res.send with the error if promise rejected', async () => {
      scheduleModel.find = jest.fn().mockRejectedValueOnce(fakeError)

      await scheduleControllerTest.patchSessionMethod(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })

  describe('postMethod', () => {
    test('should call findOneAndUpdate', async () => {
      scheduleModel.findOneAndUpdate = jest.fn()

      await scheduleControllerTest.postMethod(req, res)

      expect(scheduleModel.findOneAndUpdate).toHaveBeenCalled()
    })

    test('should call res.send with the schedules', async () => {
      scheduleModel.find = jest.fn().mockResolvedValueOnce(fakeSchedules)

      await scheduleControllerTest.postMethod(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeSchedules)
    })

    test('should call res.send with the error if promise rejected', async () => {
      scheduleModel.find = jest.fn().mockRejectedValueOnce(fakeError)

      await scheduleControllerTest.postMethod(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })

  describe('deleteMethod', () => {
    test('should call findOneAndUpdate', async () => {
      scheduleModel.findOneAndUpdate = jest.fn()

      await scheduleControllerTest.deleteMethod(req, res)

      expect(scheduleModel.findOneAndUpdate).toHaveBeenCalled()
    })

    test('should call res.send with the schedules', async () => {
      scheduleModel.find = jest.fn().mockResolvedValueOnce(fakeSchedules)

      await scheduleControllerTest.deleteMethod(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeSchedules)
    })

    test('should call res.send with the error if promise rejected', async () => {
      scheduleModel.find = jest.fn().mockRejectedValueOnce(fakeError)

      await scheduleControllerTest.deleteMethod(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })
})
