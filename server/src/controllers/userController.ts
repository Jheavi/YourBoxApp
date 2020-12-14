import { Request, Response } from 'express'
import images from '../constants/images'
import { extractDataFromDate } from '../utils/dateFunctions'

interface userControllerInterface {
  getUsers: Function
  getUser: Function
  postUser: Function
  addSession: Function
  removeSession: Function
  updateResult: Function
  toggleActive: Function
  updateProgram: Function
}

function userController (userModel): userControllerInterface {
  async function getUsers ({ query: { active, affiliatedBox } }: Request, res: Response) {
    try {
      const query = active ? { active, affiliatedBox } : { affiliatedBox }
      const users = await userModel.find(query).populate('affiliatedProgram')

      res.send(users)
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
        const userToCreate = { ...user, active: false, admin: false, avatar: images.avatar, pastSessions: [], reservedSessions: [], signInDate: dayString }
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

  async function toggleActive ({ params: { userId }, body: { active } }: Request, res: Response) {
    try {
      const query = { userId }
      const update = { active: !active }

      const updatedUser = await userModel.findOneAndUpdate(query, update, { new: true })

      await updatedUser.populate('affiliatedProgram').execPopulate()
      await updatedUser.populate('affiliatedBox').execPopulate()

      res.send(updatedUser)
    } catch (error) {
      res.send(error)
    }
  }

  async function updateProgram ({ params: { userId }, body: { programId } }: Request, res: Response) {
    try {
      const query = { userId }
      const update = { affiliatedProgram: programId }

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
    updateResult,
    toggleActive,
    updateProgram
  }
}

module.exports = userController
