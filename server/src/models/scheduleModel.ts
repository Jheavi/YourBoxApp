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
  sessions: [scheduleHour]
}

const scheduleSchema: schedule = new Schema({
  day: String,
  gym: { type: Schema.Types.ObjectId, ref: 'Gym' },
  sessions: [Object]
})

module.exports = model('Schedule', scheduleSchema)
