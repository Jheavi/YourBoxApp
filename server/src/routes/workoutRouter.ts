export {}
const { Router } = require('express')

function workoutRouter (workoutModel) {
  const router = Router()

  router.route('/')
    .get((req, res) => {
      res.send('hola')
    })

  return router
}

module.exports = workoutRouter
