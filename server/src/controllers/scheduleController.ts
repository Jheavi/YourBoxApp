interface scheduleControllerInterface {
  getMethod: Function
  getAllMethod: Function
  patchSessionMethod: Function
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

  async function patchSessionMethod ({ params: { day }, body: { session, finishHourValue, startHourValue, typeValue } }, res) {
    try {
      const query = {
        day,
        'hours.finishHour': session.finishHour,
        'hours.startHour': session.startHour,
        'hours.type': session.type
      }
      const update = {
        $set: {
          'hours.$.finishHour': finishHourValue,
          'hours.$.startHour': startHourValue,
          'hours.$.type': typeValue
        }
      }

      await scheduleModel.findOneAndUpdate(query, update)

      const schedules = await scheduleModel.find({})
      res.send(schedules)
    } catch (error) {
      res.send(error)
    }
  }

  return { getMethod, getAllMethod, patchSessionMethod }
}

module.exports = scheduleController
