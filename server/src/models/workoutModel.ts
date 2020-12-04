const mongoose = require('mongoose')

const { Schema, model } = mongoose

export interface workout {
  description?: string,
  title?: string,
  gym?: string,
  date: string,
  type?: string
}

const workoutSchema: workout = new Schema({
  description: String,
  title: String,
  gym: { type: Schema.Types.ObjectId, ref: 'Gym' },
  date: String,
  type: String
})

export default model('Workout', workoutSchema)
