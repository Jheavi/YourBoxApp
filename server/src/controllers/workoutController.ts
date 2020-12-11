import { Request, Response } from 'express'

interface workoutControllerInterface {
  getAllMethod: Function
  getWorkoutMethod: Function
  patchWorkoutMethod: Function
  deleteWorkoutMethod: Function
}

function workoutController (workoutModel): workoutControllerInterface {
  async function getAllMethod ({ query: { boxId } }: Request, res: Response) {
    try {
      const query = { box: boxId }
      const workouts = await workoutModel.find(query)
      res.send(workouts)
    } catch (error) {
      res.send(error)
    }
  }

  async function getWorkoutMethod ({ params: { date }, query: { boxId } }: Request, res: Response) {
    try {
      const queryToFind = { date, box: boxId }

      const workout = await workoutModel.findOne(queryToFind)
      res.send(workout)
    } catch (error) {
      res.send(error)
    }
  }

  async function patchWorkoutMethod ({ params: { date }, body: { boxId, updatedDescription, updatedTitle, updatedType } }: Request, res: Response) {
    try {
      const queryToFind = { date }
      const workout = await workoutModel.findOneAndUpdate(
        queryToFind,
        {
          box: boxId,
          description: updatedDescription,
          title: updatedTitle,
          type: updatedType
        },
        { upsert: true, new: true })

      res.send(workout)
    } catch (error) {
      res.send(error)
    }
  }

  async function deleteWorkoutMethod ({ body: { boxId }, params: { date } }: Request, res: Response) {
    try {
      const query = { box: boxId, date }

      const workout = await workoutModel.findOneAndDelete(query)

      res.send(workout)
    } catch (error) {
      res.send(error)
    }
  }

  return { getAllMethod, getWorkoutMethod, patchWorkoutMethod, deleteWorkoutMethod }
}

module.exports = workoutController
