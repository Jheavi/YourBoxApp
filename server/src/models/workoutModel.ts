const mongoose = require('mongoose')

const { Schema, model } = mongoose

export interface workout {
  description: string,
  gym: string,
  date: string,
  type: string
}

const workoutSchema: workout = new Schema({
  description: String,
  title: String,
  gym: { type: Schema.Types.ObjectId, ref: 'gym' },
  date: String,
  type: String
})

module.exports = model('Workout', workoutSchema)
