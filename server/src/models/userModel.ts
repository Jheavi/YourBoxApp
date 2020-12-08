import { SessionInterface } from './scheduleModel'

const { Schema, model } = require('mongoose')

export interface reservedSessionInterface extends SessionInterface {
  day: string
}

export interface pastSession extends reservedSessionInterface {
  result?: string
}

export interface userInterface {
  active: boolean
  readonly admin: boolean,
  affiliatedGym?: string,
  affiliatedProgram?: string,
  connection: string,
  email: string,
  name: string,
  ownerOfGym?: string,
  pastSessions: pastSession[],
  reservedSessions: reservedSessionInterface[],
  signInDate: string,
  userId: string
}

const userSchema: userInterface = new Schema({
  active: Boolean,
  admin: false,
  affiliatedGym: { type: Schema.Types.ObjectId, ref: 'Gym' },
  affiliatedProgram: { type: Schema.Types.ObjectId, ref: 'Program' },
  connection: String,
  email: String,
  name: String,
  ownerOfGym: { type: Schema.Types.ObjectId, ref: 'Gym' },
  pastSessions: [Object],
  reservedSessions: [Object],
  signInDate: String,
  userId: String
})

export default model('User', userSchema)
