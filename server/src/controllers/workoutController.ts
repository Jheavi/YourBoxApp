function workoutController (workoutModel) {
  async function getAllMethod (req, res) {
    try {
      const query = {}
      const workouts = await workoutModel.find(query)
      res.send(workouts)
    } catch (error) {
      res.send(error)
    }
  }

  async function getWorkoutMethod ({ params: { date } }, res) {
    try {
      const queryToFind = { date }
      const workout = await workoutModel.findOne(queryToFind)
      res.send(workout)
    } catch (error) {
      res.send(error)
    }
  }

  async function patchWorkoutMethod ({ params: { date }, body: { updatedDescription, updatedTitle, updatedType } }, res) {
    try {
      const queryToFind = { date }
      const workout = await workoutModel.findOneAndUpdate(
        queryToFind,
        {
          description: updatedDescription,
          title: updatedTitle,
          type: updatedType
        },
        { upsert: true, new: true })

      res.send(workout)
    } catch (error) {
      res.send(error)
    }
  }

  return { getAllMethod, getWorkoutMethod, patchWorkoutMethod }
}

module.exports = workoutController
