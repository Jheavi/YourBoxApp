const userModel = require('../models/userModel')
const userControllerTest = require('./userController')(userModel)

jest.mock('../models/userModel')

describe('userController', () => {
  let res
  let req
  let fakeUser
  let newUser
  let fakeError
  let fakeReservedSession

  beforeEach(() => {
    res = { send: jest.fn() }
    fakeUser = { name: 'aa', populate: jest.fn().mockReturnValue({ execPopulate: jest.fn() }) }
    newUser = { name: 'aa', populate: jest.fn().mockReturnValue({ execPopulate: jest.fn() }) }
    fakeError = 'error'
    fakeReservedSession = {}
  })

  describe('getUsers', () => {
    test('should call res.send with the user', async () => {
      req = { query: { active: true, affiliatedBox: '456' } }
      userModel.find = jest.fn().mockResolvedValueOnce(fakeUser)

      await userControllerTest.getUsers(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeUser)
    })

    test('should call res.send with the error if promise rejected', async () => {
      req = { query: { affiliatedBox: '456' } }
      userModel.find = jest.fn().mockRejectedValueOnce(fakeError)

      await userControllerTest.getUsers(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })

  describe('postUser', () => {
    test('should call res.send with the user if the user already exists', async () => {
      req = { body: { user: {} } }
      userModel.findOne = jest.fn().mockResolvedValueOnce(fakeUser)

      await userControllerTest.postUser(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeUser)
    })

    test('should call res.send with a new user if the user doesn\'t exists previously', async () => {
      req = { body: { user: {} } }
      userModel.findOne = jest.fn().mockResolvedValueOnce(null)
      userModel.create = jest.fn().mockResolvedValueOnce(newUser)

      await userControllerTest.postUser(req, res)

      expect(res.send).toHaveBeenCalledWith(newUser)
    })

    test('should call res.send with the error if promise rejected', async () => {
      req = { body: { user: {} } }
      userModel.findOne = jest.fn().mockRejectedValueOnce(fakeError)

      await userControllerTest.postUser(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })

  describe('getUser', () => {
    test('should call res.send with the user', async () => {
      req = { params: { email: 'fake' } }
      userModel.findOne = jest.fn().mockResolvedValueOnce(fakeUser)

      await userControllerTest.getUser(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeUser)
    })

    test('should call res.send with the error if promise rejected', async () => {
      req = { params: { email: 'fake' } }
      userModel.findOne = jest.fn().mockRejectedValueOnce(fakeError)

      await userControllerTest.getUser(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })

  describe('updateUser', () => {
    test('should call res.send with the user if option is "add"', async () => {
      req = { params: { email: 'fake' }, body: { option: 'add', reservedSession: fakeReservedSession } }
      userModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce(fakeUser)

      await userControllerTest.updateUser(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeUser)
    })

    test('should call res.send with the user if option is "remove"', async () => {
      req = { params: { email: 'fake' }, body: { option: 'remove', reservedSession: fakeReservedSession } }
      userModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce(fakeUser)

      await userControllerTest.updateUser(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeUser)
    })

    test('should call res.send with the error if promise rejected', async () => {
      req = { params: { email: 'fake' }, body: { option: 'remove', reservedSession: fakeReservedSession } }
      userModel.findOneAndUpdate = jest.fn().mockRejectedValueOnce(fakeError)

      await userControllerTest.updateUser(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })
})
