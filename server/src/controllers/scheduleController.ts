interface scheduleControllerInterface {
  getMethod: Function
  getAllMethod: Function
}

function scheduleController (scheduleModel): scheduleControllerInterface {
  async function getAllMethod (req, res) {
    try {
      const query = { }
      const schedules = await scheduleModel.find(query)
      res.send(schedules)
    } catch (error) {
      res.send(error)
    }
  }

  async function getMethod ({ params: { day } }, res) {
    try {
      const query = { day }
      const schedule = await scheduleModel.findOne(query)
      res.send(schedule)
    } catch (error) {
      res.send(error)
    }
  }

  return { getMethod, getAllMethod }
}

module.exports = scheduleController
