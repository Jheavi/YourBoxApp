const mongoose = require('mongoose')

const { Schema, model } = mongoose

export interface box {
  name: string,
  owner: string,
  direction: string,
  affiliates: string[]
}

const boxSchema: box = new Schema({
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  direction: String,
  affiliates: [String]
})

export default model('Box', boxSchema)
