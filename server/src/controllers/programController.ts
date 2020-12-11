import { Request, Response } from 'express'

interface programControllerInterface {
  getAllPrograms: Function
  patchProgram: Function
  createProgram: Function
}

function programController (programModel): programControllerInterface {
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

  async function createProgram ({ body: { name, sessions, boxId } }: Request, res: Response) {
    try {
      const newProgram = { name, sessionsPerMonth: sessions, box: boxId }

      const programCreated = await programModel.create(newProgram)

      res.send(programCreated)
    } catch (error) {
      res.send(error)
    }
  }

  return { getAllPrograms, patchProgram, createProgram }
}

module.exports = programController
