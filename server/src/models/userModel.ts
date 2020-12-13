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
  avatar: string
  affiliatedBox?: string,
  affiliatedProgram?: string,
  connection: string,
  email: string,
  name: string,
  ownerOfBox?: string,
  pastSessions: pastSession[],
  reservedSessions: reservedSessionInterface[],
  signInDate: string,
  userId: string
}

const userSchema: userInterface = new Schema({
  active: Boolean,
  admin: Boolean,
  avatar: String,
  affiliatedBox: { type: Schema.Types.ObjectId, ref: 'Box' },
  affiliatedProgram: { type: Schema.Types.ObjectId, ref: 'Program' },
  connection: String,
  email: String,
  name: String,
  ownerOfBox: { type: Schema.Types.ObjectId, ref: 'Box' },
  pastSessions: [Object],
  reservedSessions: [Object],
  signInDate: String,
  userId: String
})

export default model('User', userSchema)
