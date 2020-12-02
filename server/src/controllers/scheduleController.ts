import { Request, Response } from 'express'

interface scheduleControllerInterface {
  getMethod: Function
  getAllMethod: Function
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
      const query = {
        day,
        'hours.finishHour': session.finishHour,
        'hours.startHour': session.startHour,
        'hours.type': session.type
      }
      const update = {
        $set: {
          'hours.$.finishHour': finishHourValue,
          'hours.$.startHour': startHourValue,
          'hours.$.type': typeValue
        }
      }

      await scheduleModel.findOneAndUpdate(query, update)

      const schedules = await scheduleModel.find({})
      res.send(schedules)
    } catch (error) {
      res.send(error)
    }
  }

  async function postMethod ({ params: { day }, body: { finishHourValue, startHourValue, typeValue } }: Request, res: Response) {
    try {
      const query = { day }
      const update = { $addToSet: { hours: { finishHour: finishHourValue, startHour: startHourValue, type: typeValue } } }

      await scheduleModel.findOneAndUpdate(query, update)

      const schedules = await scheduleModel.find({})
      res.send(schedules)
    } catch (error) {
      res.send(error)
    }
  }

  return { getMethod, getAllMethod, patchSessionMethod, postMethod }
}

module.exports = scheduleController
