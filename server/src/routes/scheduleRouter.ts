export {}
const { Router } = require('express')
const scheduleController = require('../controllers/scheduleController')

function scheduleRouter (scheduleModel) {
  const router = Router()
  const schedules = scheduleController(scheduleModel)

  router.route('/')
    .get(schedules.getAllMethod)

  router.route('/:day')
    .get(schedules.getMethod)
    .patch(schedules.patchSessionMethod)
    .post(schedules.postMethod)
    .delete(schedules.deleteMethod)

  return router
}

module.exports = scheduleRouter
