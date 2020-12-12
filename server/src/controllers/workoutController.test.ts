const workoutModel = require('../models/workoutModel')
const workoutControllerTest = require('./workoutController')(workoutModel)

jest.mock('../models/workoutModel')

describe('workoutController', () => {
  let res
  let req
  let fakeWorkout
  let fakeError

  beforeEach(() => {
    res = { send: jest.fn() }
    req = { body: {}, params: { date: '123' }, query: { boxId: '456' } }
    fakeWorkout = { date: 'today' }
    fakeError = 'error'
  })

  describe('getAllMethod', () => {
    test('should call res.send with the workout', async () => {
      workoutModel.find = jest.fn().mockResolvedValueOnce(fakeWorkout)

      await workoutControllerTest.getAllMethod(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeWorkout)
    })

    test('should call res.send with the error if promise rejected', async () => {
      workoutModel.find = jest.fn().mockRejectedValueOnce(fakeError)

      await workoutControllerTest.getAllMethod(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })

  describe('getWorkout', () => {
    test('should call res.send with the workout', async () => {
      workoutModel.findOne = jest.fn().mockResolvedValueOnce(fakeWorkout)

      await workoutControllerTest.getWorkout(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeWorkout)
    })

    test('should call res.send with the error if promise rejected', async () => {
      workoutModel.findOne = jest.fn().mockRejectedValueOnce(fakeError)

      await workoutControllerTest.getWorkout(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })

  describe('updateWorkout', () => {
    test('should call res.send with the updated workout', async () => {
      workoutModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce(fakeWorkout)

      await workoutControllerTest.updateWorkout(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeWorkout)
    })

    test('should call res.send with the error if promise rejected', async () => {
      workoutModel.findOneAndUpdate = jest.fn().mockRejectedValueOnce(fakeError)

      await workoutControllerTest.updateWorkout(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })

  describe('deleteWorkout', () => {
    test('should call res.send with the erased workout', async () => {
      workoutModel.findOneAndDelete = jest.fn().mockResolvedValueOnce(fakeWorkout)

      await workoutControllerTest.deleteWorkout(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeWorkout)
    })

    test('should call res.send with the error if promise rejected', async () => {
      workoutModel.findOneAndDelete = jest.fn().mockRejectedValueOnce(fakeError)

      await workoutControllerTest.deleteWorkout(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })
})
