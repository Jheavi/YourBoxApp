interface scheduleControllerInterface {
  getMethod: Function
}

function scheduleController (scheduleModel): scheduleControllerInterface {
  async function getMethod ({ params: { day } }, res) {
    try {
      const query = { day }
      const schedule = await scheduleModel.findOne(query)
      res.send(schedule)
    } catch (error) {
      res.send(error)
    }
  }

  return { getMethod }
}

module.exports = scheduleController
