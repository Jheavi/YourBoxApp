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

  async function getWorkoutMethod ({ params: { date } }, res) {
    try {
      console.log(date)
      const queryToFind: object = { date }
      const workout = await workoutModel.findOne(queryToFind)
      res.send(workout)
    } catch (error) {
      res.send(error)
    }
  }

  return { getAllMethod, getWorkoutMethod }
}

module.exports = workoutController
