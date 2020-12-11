import { Request, Response } from 'express'

interface programControllerInterface {
  getAllPrograms: Function
  patchProgram: Function
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

  async function patchProgram ({ params: { programId }, body: { program } }: Request, res: Response) {
    try {
      const query = { box: program.box, _id: programId }
      const update = { ...program, name: program.name, sessionsPerMonth: program.sessionsPerMonth }

      const updatedProgram = await programModel.findOneAndUpdate(query, update, { new: true })

      res.send(updatedProgram)
    } catch (error) {
      res.send(error)
    }
  }

  return { getAllPrograms, patchProgram }
}

module.exports = workoutController
