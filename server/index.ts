import scheduleModel from './src/models/scheduleModel'
import workoutModel from './src/models/workoutModel'
import userModel from './src/models/userModel'
import programModel from './src/models/programModel'
import boxModel from './src/models/boxModel'
import { changeReservedSessionsToPastSessions } from './src/utils/userExtraFunctions'
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const chalk = require('chalk')
const workoutRouter = require('./src/routes/workoutRouter')(workoutModel)
const scheduleRouter = require('./src/routes/scheduleRouter')(scheduleModel)
const userRouter = require('./src/routes/userRouter')(userModel, boxModel)
const boxRouter = require('./src/routes/boxRouter')(boxModel)
const programRouter = require('./src/routes/programRouter')(programModel)

const oneHourTime = 3600000
const server = express()
const port = process.env.PORT || 2130
const dbUrl = process.env.DBURL || 'mongodb+srv://Jheavi:GymAppSkylab@gymapp.yu4va.mongodb.net/gymappdb?retryWrites=true&w=majority'

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

server.use(morgan('dev'))

server.use(cors())

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.use('/workouts', workoutRouter)
server.use('/schedules', scheduleRouter)
server.use('/users', userRouter)
server.use('/programs', programRouter)
server.use('/boxes', boxRouter)

server.listen(port, () => {
  console.log(`Server listening on port ${chalk.blueBright(port)}...`)
  changeReservedSessionsToPastSessions()
  setInterval(() => {
    changeReservedSessionsToPastSessions()
  }, oneHourTime)
})
