const { Schema, model } = require('mongoose')

export interface programInterface {
  name: string
  gym?: string
  sessionsPerMonth: number
}

const programSchema: programInterface = new Schema({
  name: String,
  gym: { type: Schema.Types.ObjectId, ref: 'Gym' },
  sessionsPerMonth: Number
})

export default model('Program', programSchema)
