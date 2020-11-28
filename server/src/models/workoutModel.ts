export {}
const mongoose = require('mongoose')

const { Schema, model } = mongoose

const workoutSchema = new Schema({
  description: String,
  gym: { type: Schema.Types.ObjectId, ref: 'gym' },
  date: String,
  type: String
})

module.exports = model('Workout', workoutSchema)
