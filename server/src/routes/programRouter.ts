export {}
const { Router } = require('express')
const programController = require('../controllers/programController')

function programRouter (programModel) {
  const router = Router()
  const programs = programController(programModel)

  router.route('/')
    .get(programs.getAllPrograms)
    .post(programs.createProgram)

  router.route('/:programId')
    .patch(programs.patchProgram)

  return router
}

module.exports = programRouter
