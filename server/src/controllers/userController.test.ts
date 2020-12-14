const userModel = require('../models/userModel')
const userControllerTest = require('./userController')(userModel)

jest.mock('../models/userModel')

describe('userController', () => {
  let res
  let req
  let fakeUser
  let fakeUsers
  let newUser
  let fakeError
  let fakeUsersError
  let fakeReservedSession
  let fakePastSession
  let fakeResult

  beforeEach(() => {
    res = { send: jest.fn() }
    fakeUser = { name: 'aa', populate: jest.fn().mockReturnValue({ execPopulate: jest.fn() }) }
    fakeUsers = { users: [{ name: 'aa' }], populate: jest.fn().mockResolvedValueOnce([{ name: 'aa' }]) }
    newUser = { name: 'aa', populate: jest.fn().mockReturnValue({ execPopulate: jest.fn() }) }
    fakeError = 'error'
    fakeUsersError = { populate: jest.fn().mockRejectedValueOnce(fakeError) }
    fakeReservedSession = {}
    fakePastSession = {}
    fakeResult = '1342'
  })

  describe('getUsers', () => {
    test('should call res.send with the user', async () => {
      req = { query: { active: true, affiliatedBox: '456' } }
      userModel.find = jest.fn().mockReturnValueOnce(fakeUsers)

      await userControllerTest.getUsers(req, res)

      expect(res.send).toHaveBeenCalledWith([{ name: 'aa' }])
    })

    test('should call res.send with the error if promise rejected', async () => {
      req = { query: { affiliatedBox: '456' } }
      userModel.find = jest.fn().mockReturnValueOnce(fakeUsersError)

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
      req = { params: { userId: 'fake' } }
      userModel.findOne = jest.fn().mockResolvedValueOnce(fakeUser)

      await userControllerTest.getUser(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeUser)
    })

    test('should call res.send with the error if promise rejected', async () => {
      req = { params: { userId: 'fake' } }
      userModel.findOne = jest.fn().mockRejectedValueOnce(fakeError)

      await userControllerTest.getUser(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })

  describe('addSession', () => {
    beforeEach(() => {
      req = { params: { userId: 'fake' }, body: { reservedSession: fakeReservedSession } }
    })

    test('should call res.send with the user', async () => {
      userModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce(fakeUser)

      await userControllerTest.addSession(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeUser)
    })

    test('should call res.send with the error if promise rejected', async () => {
      userModel.findOneAndUpdate = jest.fn().mockRejectedValueOnce(fakeError)

      await userControllerTest.addSession(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })

  describe('removeSession', () => {
    beforeEach(() => {
      req = { params: { userId: 'fake' }, body: { reservedSession: fakeReservedSession } }
    })

    test('should call res.send with the user', async () => {
      userModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce(fakeUser)

      await userControllerTest.removeSession(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeUser)
    })

    test('should call res.send with the error if promise rejected', async () => {
      userModel.findOneAndUpdate = jest.fn().mockRejectedValueOnce(fakeError)

      await userControllerTest.removeSession(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })

  describe('updateResult', () => {
    beforeEach(() => {
      req = { params: { userId: 'fake' }, body: { pastSession: fakePastSession, result: fakeResult } }
    })

    test('should call res.send with the user', async () => {
      userModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce(fakeUser)

      await userControllerTest.updateResult(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeUser)
    })

    test('should call res.send with the error if promise rejected', async () => {
      userModel.findOneAndUpdate = jest.fn().mockRejectedValueOnce(fakeError)

      await userControllerTest.updateResult(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })

  describe('toggleActive', () => {
    beforeEach(() => {
      req = { params: { userId: 'fake' }, body: { active: true } }
    })

    test('should call res.send with the user', async () => {
      userModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce(fakeUser)

      await userControllerTest.toggleActive(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeUser)
    })

    test('should call res.send with the error if promise rejected', async () => {
      userModel.findOneAndUpdate = jest.fn().mockRejectedValueOnce(fakeError)

      await userControllerTest.toggleActive(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })

  describe('updateProgram', () => {
    beforeEach(() => {
      req = { params: { userId: 'fake' }, body: { programId: '1234' } }
    })

    test('should call res.send with the user', async () => {
      userModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce(fakeUser)

      await userControllerTest.updateProgram(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeUser)
    })

    test('should call res.send with the error if promise rejected', async () => {
      userModel.findOneAndUpdate = jest.fn().mockRejectedValueOnce(fakeError)

      await userControllerTest.updateProgram(req, res)

      expect(res.send).toHaveBeenCalledWith(fakeError)
    })
  })
})
