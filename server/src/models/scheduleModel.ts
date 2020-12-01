const mongoose = require('mongoose')

const { Schema, model } = mongoose

export interface scheduleHour {
  finishHour: string,
  startHour: string,
  type: string
}

export interface schedule {
  day: string,
  gym?: string,
  hours: [scheduleHour]
}

const scheduleSchema: schedule = new Schema({
  day: String,
  gym: { type: Schema.Types.ObjectId, ref: 'Gym' },
  hours: [Object]
})

module.exports = model('Schedule', scheduleSchema)
