import { Request, Response } from 'express'
import { extractDataFromTodayDate } from '../utils/dateFunctions'

interface userControllerInterface {
  // deleteUser: Function
  getUsers: Function
  getUser: Function
  postUser: Function
  updateUser: Function
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

  async function postUser ({ body: { user } }: Request, res: Response) {
    try {
      const queryUserExists = { userId: user.userId }
      const userExists = await userModel.findOne(queryUserExists)

      if (userExists) {
        await userExists.populate('affiliatedProgram').execPopulate()
        res.send(userExists)
      } else {
        const { todayString } = extractDataFromTodayDate()
        const userToCreate = { ...user, active: false, admin: false, pastSessions: [], reservedSessions: [], signInDate: todayString }
        const userCreated = await userModel.create(userToCreate)
        await userCreated.populate('affiliatedProgram').execPopulate()
        res.send(userCreated)
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

  async function updateUser ({ body: { reservedSession, option }, params: { email } }: Request, res: Response) {
    try {
      const query = { email }
      if (option === 'add') {
        const update = { $addToSet: { reservedSessions: reservedSession } }
        const updatedUser = await userModel.findOneAndUpdate(query, update, { new: true })
        await updatedUser.populate('affiliatedProgram').execPopulate()
        res.send(updatedUser)
      } else {
        const update = { $pull: { reservedSessions: reservedSession } }
        const updatedUser = await userModel.findOneAndUpdate(query, update, { new: true })
        await updatedUser.populate('affiliatedProgram').execPopulate()
        res.send(updatedUser)
      }
    } catch (error) {
      res.send(error)
    }
  }

  return {
    // deleteUser,
    getUsers,
    getUser,
    postUser,
    updateUser
  }
}

module.exports = userController
