export {}
const { Router } = require('express')
const workoutController = require('../controllers/workoutController')

function workoutRouter (workoutModel) {
  const router = Router()
  const workouts = workoutController(workoutModel)

  router.route('/')
    .get(workouts.getAllMethod)

  router.route('/:date')
    .get(workouts.getWorkoutMethod)
    .patch(workouts.patchWorkoutMethod)
    .delete(workouts.deleteWorkoutMethod)

  return router
}

module.exports = workoutRouter
