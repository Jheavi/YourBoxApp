const mongoose = require('mongoose')

const { Schema, model } = mongoose

export interface SessionInterface {
  finishHour: string,
  startHour: string,
  type: string
}

export interface schedule {
  day: string,
  box: string,
  sessions: SessionInterface[]
}

const scheduleSchema: schedule = new Schema({
  day: String,
  box: { type: Schema.Types.ObjectId, ref: 'Box' },
  sessions: [Object]
})

export default model('Schedule', scheduleSchema)
