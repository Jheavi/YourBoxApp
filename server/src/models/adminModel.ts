const mongoose = require('mongoose')

const { Schema, model } = mongoose

export interface adminInterface {
  active: boolean
  readonly admin: boolean,
  email: string,
  name: string,
  ownerOfGym?: string,
  signInDate: string,
}

const adminSchema: adminInterface = new Schema({
  active: Boolean,
  admin: true,
  email: String,
  name: String,
  ownerOfGym: { type: Schema.Types.ObjectId, ref: 'Gym' },
  signInDate: String
})

export default model('Admin', adminSchema)
