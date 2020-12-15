export {}
const programModel = require('../models/programModel')
const programControllerTest = require('./programController')(programModel)

jest.mock('../models/programModel')

describe('programController', () => {
  let res
  let req
  let fakeUpdatedProgram
  let fakeNewProgram
  let fakePrograms
  let fakeError

  beforeEach(() => {
    res = { send: jest.fn() }
    req = { body: { program: {}, name: 'a', sessions: 1 }, params: { programId: '123' }, query: { boxId: '456' } }
    fakePrograms = [{ name: 'a', sessionsPerMonth: 8, box: '789' }]
    fakeUpdatedProgram = { name: 'a', sessionsPerMonth: 6, box: '789' }
    fakeNewProgram = { name: 'b', sessionsPerMonth: 12, box: '456' }
    fakeError = 'error'
  })

  describe('getAllPrograms', () => {
    test('should call res.send with the programs', async () => {
      programModel.find = jest.fn().mockResolvedValueOnce(fakePrograms)

      await programControllerTest.getAllPrograms(req, res)

      expect(res.send).toHaveBeenCalledWith(fakePrograms)
    })

    test('should call res.send with the error if promise rejected', async () => {
      programModel.find = jest.fn().mockRejectedValueOnce(fakeError)

      await programControllerTest.getAllPrograms(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })

  describe('patchProgram', () => {
    test('should call res.send with the updated program', async () => {
      programModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce(fakeUpdatedProgram)

      await programControllerTest.patchProgram(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeUpdatedProgram)
    })

    test('should call res.send with the error if promise rejected', async () => {
      programModel.findOneAndUpdate = jest.fn().mockRejectedValueOnce(fakeError)

      await programControllerTest.patchProgram(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })

  describe('createProgram', () => {
    test('should call res.send with the new program', async () => {
      programModel.create = jest.fn().mockResolvedValueOnce(fakeNewProgram)

      await programControllerTest.createProgram(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeNewProgram)
    })

    test('should call res.send with the error if promise rejected', async () => {
      programModel.create = jest.fn().mockRejectedValueOnce(fakeError)

      await programControllerTest.createProgram(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })
})
