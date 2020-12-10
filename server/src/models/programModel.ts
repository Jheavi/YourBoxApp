const { Schema, model } = require('mongoose')

export interface programInterface {
  name: string
  box: string
  sessionsPerMonth: number
}

const programSchema: programInterface = new Schema({
  name: String,
  box: { type: Schema.Types.ObjectId, ref: 'Box' },
  sessionsPerMonth: Number
})

export default model('Program', programSchema)
