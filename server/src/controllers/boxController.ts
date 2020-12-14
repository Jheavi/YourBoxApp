import { Request, Response } from 'express'

interface programControllerInterface {
  getAllBoxes: Function
}

function programController (boxModel): programControllerInterface {
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

module.exports = programController
