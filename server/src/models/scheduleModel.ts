const mongoose = require('mongoose')

const { Schema, model } = mongoose

export interface SessionInterface {
  finishHour: string,
  startHour: string,
  type: string
}

export interface schedule {
  day: string,
  gym?: string,
  sessions: SessionInterface[]
}

const scheduleSchema: schedule = new Schema({
  day: String,
  gym: { type: Schema.Types.ObjectId, ref: 'Gym' },
  sessions: [Object]
})

export default model('Schedule', scheduleSchema)
