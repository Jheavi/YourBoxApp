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

  test('getAllMethod should call res.send with the workout', async () => {
    workoutModel.find = jest.fn().mockResolvedValueOnce(fakeWorkout)

    await workoutControllerTest.getAllMethod(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeWorkout)
  })

  test('getAllMethod should call res.send with the error if promise rejected', async () => {
    workoutModel.find = jest.fn().mockRejectedValueOnce(fakeError)

    await workoutControllerTest.getAllMethod(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeError)
  })

  test('getWorkoutMethod should call res.send with the workout', async () => {
    workoutModel.findOne = jest.fn().mockResolvedValueOnce(fakeWorkout)

    await workoutControllerTest.getWorkoutMethod(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeWorkout)
  })

  test('getWorkoutMethod should call res.send with the error if promise rejected', async () => {
    workoutModel.findOne = jest.fn().mockRejectedValueOnce(fakeError)

    await workoutControllerTest.getWorkoutMethod(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeError)
  })

  test('patchWorkoutMethod should call res.send with the workout', async () => {
    workoutModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce(fakeWorkout)

    await workoutControllerTest.patchWorkoutMethod(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeWorkout)
  })

  test('patchWorkoutMethod should call res.send with the error if promise rejected', async () => {
    workoutModel.findOneAndUpdate = jest.fn().mockRejectedValueOnce(fakeError)

    await workoutControllerTest.patchWorkoutMethod(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeError)
  })
})
