import { Request, Response } from 'express'

interface boxControllerInterface {
  getAllBoxes: Function
}

function boxController (boxModel): boxControllerInterface {
  async function getAllBoxes (req: Request, res: Response) {
    try {
      const query = {}

      const boxes = await boxModel.find(query)

      res.send(boxes)
    } catch (error) {
      res.send(error)
    }
  }

  return { getAllBoxes }
}

module.exports = boxController
