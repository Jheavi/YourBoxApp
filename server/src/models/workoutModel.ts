const mongoose = require('mongoose')

const { Schema, model } = mongoose

export interface workout {
  description?: string,
  title?: string,
  box: string,
  date: string,
  type?: string
}

const workoutSchema: workout = new Schema({
  description: String,
  title: String,
  box: { type: Schema.Types.ObjectId, ref: 'Box' },
  date: String,
  type: String
})

export default model('Workout', workoutSchema)
