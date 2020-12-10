const mongoose = require('mongoose')

const { Schema, model } = mongoose

export interface BoxInterface {
  name: string,
  owner: string,
  direction: string,
  affiliates: string[],
  photos: string[]
}

const boxSchema: BoxInterface = new Schema({
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  direction: String,
  affiliates: [String],
  photos: [String]
})

export default model('Box', boxSchema)
