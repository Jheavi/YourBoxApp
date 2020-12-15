const boxModel = require('../models/boxModel')
const boxControllerTest = require('./boxController')(boxModel)

jest.mock('../models/boxModel')

describe('boxController', () => {
  let res
  let fakeBoxes
  let fakeError

  beforeEach(() => {
    res = { send: jest.fn() }
    fakeBoxes = [{ name: 'a' }]
    fakeError = 'error'
  })

  describe('getAllBoxes', () => {
    test('should call res.send with the boxes', async () => {
      boxModel.find = jest.fn().mockResolvedValueOnce(fakeBoxes)

      await boxControllerTest.getAllBoxes(null, res)

      expect(res.send).toHaveBeenCalledWith(fakeBoxes)
    })

    test('should call res.send with the error if promise rejected', async () => {
      boxModel.find = jest.fn().mockRejectedValueOnce(fakeError)

      await boxControllerTest.getAllBoxes(null, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })
})
