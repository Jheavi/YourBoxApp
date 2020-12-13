import { Request, Response } from 'express'
import { extractDataFromDate } from '../utils/dateFunctions'

interface userControllerInterface {
  // deleteUser: Function
  getUsers: Function
  getUser: Function
  postUser: Function
  addSession: Function
  removeSession: Function
  updateResult: Function
}

function userController (userModel): userControllerInterface {
  async function getUsers ({ query: { active, affiliatedBox } }: Request, res: Response) {
    try {
      const query = active ? { active, affiliatedBox } : { affiliatedBox }
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
        await userExists.populate('ownerOfBox').execPopulate()
        await userExists.populate('affiliatedProgram').execPopulate()
        await userExists.populate('affiliatedBox').execPopulate()

        res.send(userExists)
      } else {
        const { dayString } = extractDataFromDate()
        const userToCreate = { ...user, active: false, admin: false, pastSessions: [], reservedSessions: [], signInDate: dayString }
        const userCreated = await userModel.create(userToCreate)

        await userCreated.populate('ownerOfBox').execPopulate()
        await userCreated.populate('affiliatedProgram').execPopulate()
        await userCreated.populate('affiliatedBox').execPopulate()

        res.send(userCreated)
      }
    } catch (error) {
      res.send(error)
    }
  }

  async function getUser ({ params: { userId } }: Request, res: Response) {
    try {
      const query = { userId }
      const user = await userModel.findOne(query)
      res.send(user)
    } catch (error) {
      res.send(error)
    }
  }

  async function addSession ({ body: { reservedSession }, params: { userId } }: Request, res: Response) {
    try {
      const query = { userId }
      const update = { $addToSet: { reservedSessions: reservedSession } }
      const updatedUser = await userModel.findOneAndUpdate(query, update, { new: true })
      await updatedUser.populate('affiliatedProgram').execPopulate()
      await updatedUser.populate('affiliatedBox').execPopulate()
      res.send(updatedUser)
    } catch (error) {
      res.send(error)
    }
  }

  async function removeSession ({ body: { reservedSession }, params: { userId } }: Request, res: Response) {
    try {
      const query = { userId }
      const update = { $pull: { reservedSessions: reservedSession } }
      const updatedUser = await userModel.findOneAndUpdate(query, update, { new: true })
      await updatedUser.populate('affiliatedProgram').execPopulate()
      await updatedUser.populate('affiliatedBox').execPopulate()
      res.send(updatedUser)
    } catch (error) {
      res.send(error)
    }
  }

  async function updateResult ({ body: { pastSession, result }, params: { userId } }: Request, res: Response) {
    try {
      const query = {
        userId,
        pastSessions: {
          $elemMatch: {
            finishHour: pastSession.finishHour,
            startHour: pastSession.startHour,
            type: pastSession.type,
            day: pastSession.day
          }
        }
      }

      const update = {
        $set: {
          'pastSessions.$.finishHour': pastSession.finishHour,
          'pastSessions.$.startHour': pastSession.startHour,
          'pastSessions.$.type': pastSession.type,
          'pastSessions.$.day': pastSession.day,
          'pastSessions.$.result': result
        }
      }
      const updatedUser = await userModel.findOneAndUpdate(query, update, { new: true })
      await updatedUser.populate('affiliatedProgram').execPopulate()
      await updatedUser.populate('affiliatedBox').execPopulate()
      res.send(updatedUser)
    } catch (error) {
      res.send(error)
    }
  }

  return {
    getUsers,
    getUser,
    postUser,
    addSession,
    removeSession,
    updateResult
  }
}

module.exports = userController
