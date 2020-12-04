import { Request, Response } from 'express'
import { extractDataFromTodayDate } from '../utils/dateFunctions'

interface userControllerInterface {
  // deleteUser: Function
  getUsers: Function
  getUser: Function
  postUser: Function
  // updateUser: Function
}

function userController (userModel): userControllerInterface {
  async function getUsers ({ query: { active } }: Request, res: Response) {
    try {
      const query = active ? { active } : {}
      const users = await userModel.find(query)
      res.send(users)
      // users.populate('affiliatedProgram')
      // users.exec((error, usersFound) => error ? res.send(error) : res.send(usersFound))
    } catch (error) {
      res.send(error)
    }
  }

  async function postUser ({ body: { newUser } }: Request, res: Response) {
    try {
      const queryUserExists = { email: newUser.email }
      const userExists = await userModel.find(queryUserExists)
      console.log(userExists)

      const { todayString } = extractDataFromTodayDate()

      if (userExists.length) {
        res.send('Email already used')
      } else {
        const userToCreate = { ...newUser, active: false, admin: false, pastSessions: [], reservedSessions: [], signInDate: todayString }
        const user = await userModel.create(userToCreate)
        // user.populate('affiliatedProgram')
        // user.exec((error, usersFound) => error ? res.send(error) : res.send(usersFound))
        res.send(user)
      }
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  }

  async function getUser ({ params: { email } }: Request, res: Response) {
    try {
      const query = { email }
      const user = await userModel.findOne(query)
      res.send(user)
    } catch (error) {
      res.send(error)
    }
  }

  return {
    // deleteUser,
    getUsers,
    getUser,
    postUser
    // updateUser,
  }
}

module.exports = userController
