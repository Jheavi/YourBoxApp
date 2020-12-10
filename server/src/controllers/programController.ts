import { Request, Response } from 'express'

interface programControllerInterface {
  getAllPrograms: Function
}

function workoutController (programModel): programControllerInterface {
  async function getAllPrograms ({ query: { boxId } }: Request, res: Response) {
    try {
      const query = { box: boxId }

      const programs = await programModel.find(query)

      res.send(programs)
    } catch (error) {
      res.send(error)
    }
  }

  return { getAllPrograms }
}

module.exports = workoutController
