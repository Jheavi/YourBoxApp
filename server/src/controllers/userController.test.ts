const userModel = require('../models/userModel')
const userControllerTest = require('./userController')(userModel)

jest.mock('../models/userModel')

describe('userController', () => {
  let res
  let req
  let fakeUser
  let newUser
  let fakeError

  beforeEach(() => {
    res = { send: jest.fn() }
    fakeUser = { name: 'aa', populate: jest.fn().mockReturnValueOnce({ execPopulate: jest.fn() }) }
    newUser = { name: 'aa', populate: jest.fn().mockReturnValueOnce({ execPopulate: jest.fn() }) }
    fakeError = 'error'
  })

  test('getUsers should call res.send with the user', async () => {
    req = { query: { active: true } }
    userModel.find = jest.fn().mockResolvedValueOnce(fakeUser)

    await userControllerTest.getUsers(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeUser)
  })

  test('getUsers should call res.send with the error if promise rejected', async () => {
    req = { query: { } }
    userModel.find = jest.fn().mockRejectedValueOnce(fakeError)

    await userControllerTest.getUsers(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeError)
  })

  test('postUser should call res.send with the user if the user already exists', async () => {
    req = { body: { user: {} } }
    userModel.findOne = jest.fn().mockResolvedValueOnce(fakeUser)

    await userControllerTest.postUser(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeUser)
  })

  test('postUser should call res.send with a new user if the user doesn\'t exists previously', async () => {
    req = { body: { user: {} } }
    userModel.findOne = jest.fn().mockResolvedValueOnce(null)
    userModel.create = jest.fn().mockResolvedValueOnce(newUser)

    await userControllerTest.postUser(req, res)

    expect(res.send).toHaveBeenCalledWith(newUser)
  })

  test('postUser should call res.send with the error if promise rejected', async () => {
    req = { body: { user: {} } }
    userModel.findOne = jest.fn().mockRejectedValueOnce(fakeError)

    await userControllerTest.postUser(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeError)
  })

  test('getUser should call res.send with the user', async () => {
    req = { params: { email: 'fake' } }
    userModel.findOne = jest.fn().mockResolvedValueOnce(fakeUser)

    await userControllerTest.getUser(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeUser)
  })

  test('getUser should call res.send with the user', async () => {
    req = { params: { email: 'fake' } }
    userModel.findOne = jest.fn().mockRejectedValueOnce(fakeError)

    await userControllerTest.getUser(req, res)

    expect(res.send).toHaveBeenCalledWith(fakeError)
  })
})
