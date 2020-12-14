export {}
const { Router } = require('express')
const userController = require('../controllers/userController')

function userRouter (userModel) {
  const router = Router()
  const users = userController(userModel)

  router.route('/')
    .get(users.getUsers)
    .post(users.postUser)

  router.route('/:userId')
    .get(users.getUser)

  router.route('/addSession/:userId')
    .patch(users.addSession)

  router.route('/removeSession/:userId')
    .patch(users.removeSession)

  router.route('/updateResult/:userId')
    .patch(users.updateResult)

  router.route('/toggleActive/:userId')
    .patch(users.toggleActive)

  router.route('/updateUserProgram/:userId')
    .patch(users.updateProgram)

  return router
}

module.exports = userRouter
