export {}

function workoutController (workoutModel) {
  async function getAllMethod (req, res) {
    try {
      const query: object = {}
      const workouts = await workoutModel.find(query)
      res.send(workouts)
    } catch (error) {
      res.send(error)
    }
  }

  return { getAllMethod }
}

module.exports = workoutController
