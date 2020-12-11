import { Request, Response } from 'express'

interface scheduleControllerInterface {
  getAllMethod: Function
  getMethod: Function
  patchSessionMethod: Function
  postMethod: Function
  deleteMethod: Function
}

function scheduleController (scheduleModel): scheduleControllerInterface {
  async function getAllMethod ({ query: { boxId } }: Request, res: Response) {
    try {
      const query = { box: boxId }
      const schedules = await scheduleModel.find(query)

      res.send(schedules)
    } catch (error) {
      res.send(error)
    }
  }

  async function getMethod ({ params: { day }, query: { boxId } }: Request, res: Response) {
    try {
      const query = { day, box: boxId }

      const schedule = await scheduleModel.findOne(query)
      res.send(schedule)
    } catch (error) {
      res.send(error)
    }
  }

  async function patchSessionMethod ({ params: { day }, body: { boxId, session, finishHourValue, startHourValue, typeValue } }: Request, res: Response) {
    try {
      const query = {
        box: boxId,
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

      await scheduleModel.findOneAndUpdate(query, update)

      const schedules = await scheduleModel.find({ box: boxId })
      res.send(schedules)
    } catch (error) {
      res.send(error)
    }
  }

  async function postMethod ({ params: { day }, body: { boxId, finishHourValue, startHourValue, typeValue } }: Request, res: Response) {
    try {
      const query = { box: boxId, day }
      const update = { $addToSet: { sessions: { finishHour: finishHourValue, startHour: startHourValue, type: typeValue } } }

      await scheduleModel.findOneAndUpdate(query, update)

      const schedules = await scheduleModel.find({ box: boxId })
      res.send(schedules)
    } catch (error) {
      res.send(error)
    }
  }

  async function deleteMethod ({ body: { session, boxId }, params: { day } }: Request, res: Response) {
    try {
      const query = {
        box: boxId,
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
        $pull: { sessions: session }
      }

      await scheduleModel.findOneAndUpdate(query, update)

      const schedules = await scheduleModel.find({ box: boxId })
      res.send(schedules)
    } catch (error) {
      res.send(error)
    }
  }

  return { getMethod, patchSessionMethod, postMethod, getAllMethod, deleteMethod }
}

module.exports = scheduleController
