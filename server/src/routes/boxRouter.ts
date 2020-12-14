export {}
const { Router } = require('express')
const boxController = require('../controllers/boxController')

function boxRouter (boxModel) {
  const router = Router()
  const boxes = boxController(boxModel)

  router.route('/')
    .get(boxes.getAllBoxes)

  return router
}

module.exports = boxRouter
