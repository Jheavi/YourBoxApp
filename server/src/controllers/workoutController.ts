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
      const queryToFind: object = { date }
      const workout = await workoutModel.findOne(queryToFind)
      res.send(workout)
    } catch (error) {
      res.send(error)
    }
  }

  async function patchWorkoutMethod ({ params: { date }, body: { updatedDescription } }, res) {
    try {
      const queryToFind: object = { date }
      const workout = await workoutModel.findOneAndUpdate(
        queryToFind,
        { description: updatedDescription },
        { upsert: true, new: true })

      res.send(workout)
    } catch (error) {
      res.send(error)
    }
  }

  return { getAllMethod, getWorkoutMethod, patchWorkoutMethod }
}

module.exports = workoutController
