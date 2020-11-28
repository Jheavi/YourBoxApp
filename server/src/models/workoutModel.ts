export {}
const mongoose = require('mongoose')

const { Schema, model } = mongoose

const workoutSchema = new Schema({
  name: String,
  classes_month: Number,
  gym: { type: Schema.Types.ObjectId, ref: 'gym' }
})

module.exports = model('Workout', workoutSchema)
