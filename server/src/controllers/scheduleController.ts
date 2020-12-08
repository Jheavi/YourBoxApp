import { Request, Response } from 'express'

interface scheduleControllerInterface {
  getAllMethod: Function
  getMethod: Function
  patchSessionMethod: Function,
  postMethod: Function
}

function scheduleController (scheduleModel): scheduleControllerInterface {
  async function getAllMethod (req: Request, res: Response) {
    try {
      const query = { }
      const schedules = await scheduleModel.find(query)
      res.send(schedules)
    } catch (error) {
      res.send(error)
    }
  }

  async function getMethod ({ params: { day } }: Request, res: Response) {
    try {
      const query = { day }
      const schedule = await scheduleModel.findOne(query)
      res.send(schedule)
    } catch (error) {
      res.send(error)
    }
  }

  async function patchSessionMethod ({ params: { day }, body: { session, finishHourValue, startHourValue, typeValue } }: Request, res: Response) {
    try {
      console.log('Session to change: ', session)

      const query = {
        day,
        sessions: {
          $elemMatch: {
            finishHour: session.finishHour,
            startHour: session.startHour,
            type: session.type
          }
        }
      }
      const update = {
        $set: {
          'sessions.$.finishHour': finishHourValue,
          'sessions.$.startHour': startHourValue,
          'sessions.$.type': typeValue
        }
      }

      await scheduleModel.findOneAndUpdate(query, update, { new: true })

      const schedules = await scheduleModel.find({})
      res.send(schedules)
    } catch (error) {
      res.send(error)
    }
  }

  async function postMethod ({ params: { day }, body: { finishHourValue, startHourValue, typeValue } }: Request, res: Response) {
    try {
      const query = { day }
      const update = { $addToSet: { sessions: { finishHour: finishHourValue, startHour: startHourValue, type: typeValue } } }

      await scheduleModel.findOneAndUpdate(query, update)

      const schedules = await scheduleModel.find({})
      res.send(schedules)
    } catch (error) {
      res.send(error)
    }
  }

  return { getMethod, patchSessionMethod, postMethod, getAllMethod }
}

module.exports = scheduleController
