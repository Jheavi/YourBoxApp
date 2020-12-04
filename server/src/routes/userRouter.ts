export {}
const { Router } = require('express')
const userController = require('../controllers/userController')

function userRouter (userModel) {
  const router = Router()
  const users = userController(userModel)

  router.route('/')
    .get(users.getUsers)
    .post(users.postUser)

  router.route('/active/:email')
    .get(users.getUser)
  //   .patch(users.updateUser)
  //   .delete(users.deleteUser)

  router.route('/inactive/:email')
    .get(users.getUser)
  //   .patch(users.updateUser)
  //   .delete(users.deleteUser)

  return router
}

module.exports = userRouter
