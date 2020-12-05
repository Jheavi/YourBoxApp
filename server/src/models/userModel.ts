import { sessionInterface } from './scheduleModel'

const mongoose = require('mongoose')

const { Schema, model } = mongoose

export interface reservedSession extends sessionInterface {
  day: string
}

export interface pastSession extends reservedSession {
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
  pastSessions: pastSession[],
  reservedSessions: reservedSession[],
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
  pastSessions: [Object],
  reservedSessions: [Object],
  signInDate: String,
  userId: String
})

export default model('User', userSchema)
